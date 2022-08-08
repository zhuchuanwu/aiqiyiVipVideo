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
interface CurrentItem {
  url: string;
  title: string;
}
interface ICurrentRouteprops {
  currentPage?: string;
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
  currentItem: CurrentItem = {
    url: "https://www.iqiyi.com/",
    title: "爱奇艺",
  };
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

  setShowFileSelector = (show: boolean) => {
    this.showFileSelector = show;
  };
  setCurrentRoute = (page: ICurrentRouteprops) => {
    this.page = page;
  };
  setCurrentItem = (num: CurrentItem) => {
    this.currentItem = num;
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
