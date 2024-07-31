import { ProviderContext, useSnackbar, VariantType } from "notistack";

let useSnackbarRef: ProviderContext;
export function SnackbarUtilsConfig() {
  useSnackbarRef = useSnackbar();
  return null;
}

const ShowSnackbar = {
  success(msg: string): boolean {
    this.toast(msg, "success");
    return true;
  },
  error(msg: string): boolean {
    this.toast(msg, "error");
    return true;
  },
  warning(msg: string): boolean {
    this.toast(msg, "warning");
    return true;
  },
  toast(msg: string, variant: VariantType = "default"): boolean {
    useSnackbarRef.enqueueSnackbar(msg, { variant, preventDuplicate: true });
    return true;
  },
};
export default ShowSnackbar;
