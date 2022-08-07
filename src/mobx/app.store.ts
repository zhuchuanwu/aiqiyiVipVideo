import { makeAutoObservable } from "mobx";

export enum RenameBoxTpe {
  file = "file",
  noteBook = "noteBook",
  copyFile = "copyFile",
  copyNoteBook = "copyNoteBook",
  createFolder = "createFolder",
}
export enum PositionTpe {
  center = "center",
  left = "left",
}
interface RenameBox {
  show: boolean;
  type?: RenameBoxTpe;
  renameModalPosition?: PositionTpe;
  defaultValue?: string;
  showError?: boolean;
  targetId: string;
  errmessage?: string;
  placeholder?: "";
}
interface AlertButtonProps {
  title: string;
}
interface ICurrentRouteprops {
  currentPage?: string;
}

interface ShareBoxprops {
  show: boolean;
  type: "file" | "noteBook";
}
interface AppAlert {
  show: boolean;
  title: string;
  content?: string;
  buttons: any[];
  color?: string;
}
interface LoadingProps {
  title?: string;
  show: boolean;
  position?: "center" | "right";
}
export default class AppStore {
  constructor() {
    // 建议使用这种方式，自动识别类型，不需要再加前缀
    makeAutoObservable(this);
  }
  menuTitle = "Documents";
  page: ICurrentRouteprops = { currentPage: "" };

  isLogout: boolean = false;
  permissions: Array<string> = [];
  alert: AppAlert = {
    show: false,
    title: "",
    content: "",
    buttons: [],
  };

  loading: LoadingProps = {
    title: "",
    show: false,
    position: "center",
  };

  showNoteBook: boolean = false;
  showFileDetail: boolean = false;
  showNoteDetail: boolean = false;
  renameBox: RenameBox = {
    show: false,
    defaultValue: "",
    renameModalPosition: PositionTpe.center,
    showError: false,
    errmessage: "",
    targetId: "",
    placeholder: "",
  };
  shareBox: ShareBoxprops = {
    show: false,
    type: "file",
  };
  networkStatus: boolean = true;
  halftransparentBg = false;
  showFileSelector: boolean = false;
  setNetworkStatus = (status: boolean) => {
    this.networkStatus = status;
    if (!status) {
      this.alert = {
        show: true,
        title: "Internet Connectivity Error",
        buttons: [],
        content:
          "An error occurred due to poor connectivity, please try again later.",
      };
    }
  };
  setShareBox = (shareBox: ShareBoxprops) => {
    this.shareBox = shareBox;
  };
  setShowFileSelector = (show: boolean) => {
    this.showFileSelector = show;
  };
  setCurrentRoute = (page: ICurrentRouteprops) => {
    this.page = page;
  };
  setMenuTitle = (num: string) => {
    this.menuTitle = num;
  };
  setAlert = (alert: AppAlert) => {
    this.alert = alert;
  };

  setLoading = (loading: LoadingProps) => {
    this.loading = loading;
  };
  setShowNoteBook = (show: boolean) => {
    this.showNoteBook = show;
  };
  setShowFileDetail = (show: boolean) => {
    this.showFileDetail = show;
  };
  setShowNoteBookdetail = (show: boolean) => {
    this.showNoteDetail = show;
  };
  setRenameBox = (renameBox: RenameBox) => {
    this.renameBox = renameBox;
  };
  setHalftransparentBg = (show: boolean) => {
    this.halftransparentBg = show;
  };
  setIslogout = (logout: boolean) => {
    this.isLogout = logout;
  };
  updatePerssions = async () => {
    // const results = await factory.get("/users/permissions");
    // if (results.status === 200) {
    //   this.permissions = results.data;
    // }
  };
}

export const appStore = new AppStore();
