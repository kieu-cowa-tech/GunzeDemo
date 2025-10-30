/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Autocomplete, CircularProgress, TextField, type SxProps } from "@mui/material";

export type FetchResult<T> = { items: T[]; total: number };

export type AsyncAutocompleteBaseProps<T> = {
  label: string;
  value: T | null;
  onChange: (v: T | null) => void;

  fetcher: (q: string, page: number, pageSize: number, signal: AbortSignal) => Promise<FetchResult<T>>;

  getOptionLabel: (o: T) => string;
  isOptionEqualToValue: (o: T, v: T) => boolean;

  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;

  minLength?: number;
  pageSize?: number;
  debounceMs?: number;

  renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => React.ReactNode;
};

export default function AsyncAutocomplete<T>(props: AsyncAutocompleteBaseProps<T>) {
  const {
    label,
    value,
    onChange,
    fetcher,
    getOptionLabel,
    isOptionEqualToValue,
    placeholder,
    disabled,
    fullWidth,
    sx,
    minLength = 2,
    pageSize = 20,
    debounceMs = 300,
    renderOption,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [options, setOptions] = React.useState<T[]>([]);
  const [page, setPage] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const debounced = useDebounce(input, debounceMs);

  // refs để quản lý lifecycle request
  const mountedRef = React.useRef(true);
  const reqIdRef = React.useRef(0);
  const pendingControllerRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      // abort mọi request còn pending khi unmount
      pendingControllerRef.current?.abort();
      pendingControllerRef.current = null;
    };
  }, []);

  // helper: setState an toàn
  const safeSet = React.useCallback(<S,>(setter: React.Dispatch<React.SetStateAction<S>>) =>
    (v: React.SetStateAction<S>) => {
      if (mountedRef.current) setter(v);
    }, []);

  const safeSetOptions = safeSet(setOptions);
  const safeSetHasMore = safeSet(setHasMore);
  const safeSetPage = safeSet(setPage);
  const safeSetLoading = safeSet(setLoading);

  // reset nhanh khi không đủ điều kiện mở/tìm kiếm
  React.useEffect(() => {
    if (!open || debounced.trim().length < minLength) {
      // huỷ request đang chạy (nếu có) và reset loading
      pendingControllerRef.current?.abort();
      pendingControllerRef.current = null;

      safeSetOptions([]);
      safeSetHasMore(false);
      safeSetPage(0);
      safeSetLoading(false);
      return;
    }

    // BẮT ĐẦU request mới: hủy cái cũ nếu còn
    pendingControllerRef.current?.abort();
    const controller = new AbortController();
    pendingControllerRef.current = controller;

    const myReqId = ++reqIdRef.current;
    safeSetLoading(true);

    (async () => {
      try {
        const res = await fetcher(debounced, 0, pageSize, controller.signal);
        // bỏ response cũ
        if (!mountedRef.current || myReqId !== reqIdRef.current) return;

        safeSetOptions(res.items);
        safeSetHasMore(res.items.length < res.total);
        safeSetPage(0);
      } catch (err: any) {
        // AbortError: bỏ qua
        if (err?.name !== "AbortError") {
          // có thể log nếu cần
        }
      } finally {
        if (mountedRef.current && myReqId === reqIdRef.current) {
          safeSetLoading(false);
        }
      }
    })();

    // cleanup chỉ abort; KHÔNG set state ở đây
    return () => {
      controller.abort();
      // đừng setLoading(false) ở đây; để finally xử lý theo reqId
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, open, pageSize, minLength, fetcher]);

  // infinite scroll
  const onListboxScroll = (e: React.SyntheticEvent) => {
    const el = e.currentTarget as HTMLElement;
    if (!hasMore || loading) return;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    if (!nearBottom) return;

    // hủy request cũ (tải trang kế tiếp là 1 request mới)
    pendingControllerRef.current?.abort();
    const controller = new AbortController();
    pendingControllerRef.current = controller;

    const myReqId = ++reqIdRef.current;
    safeSetLoading(true);
    const next = page + 1;

    (async () => {
      try {
        const res = await fetcher(debounced, next, pageSize, controller.signal);
        if (!mountedRef.current || myReqId !== reqIdRef.current) return;

        safeSetOptions(prev => [...prev, ...res.items]);
        const loaded = (next + 1) * pageSize;
        safeSetHasMore(loaded < res.total);
        safeSetPage(next);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          // optional log
        }
      } finally {
        if (mountedRef.current && myReqId === reqIdRef.current) {
          safeSetLoading(false);
        }
      }
    })();
  };

  return (
    <Autocomplete<T, false, false, false>
      fullWidth={fullWidth}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => {
        setOpen(false);
        // đóng => abort ngay và reset
        pendingControllerRef.current?.abort();
        pendingControllerRef.current = null;
        safeSetOptions([]);
        safeSetHasMore(false);
        safeSetPage(0);
        safeSetLoading(false);
      }}
      value={value}
      options={options}
      loading={loading}
      disabled={disabled}
      filterOptions={(x) => x}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      inputValue={input}
      onInputChange={(_, v) => setInput(v)}
      onChange={(_, v) => onChange(v)}
      ListboxProps={{ onScroll: onListboxScroll }}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder ?? (minLength > 1 ? `Type at least ${minLength} letters…` : undefined)}
          size="small"
          fullWidth={fullWidth}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={16} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={sx}
    />
  );
}

function useDebounce<T>(value: T, ms = 300) {
  const [d, setD] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setD(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return d;
}
