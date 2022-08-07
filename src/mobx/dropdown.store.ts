import { action, makeAutoObservable, makeObservable, observable } from "mobx";

interface DropdownProps {
  position?: { x: number; y: number; width?: number; height?: number };
  directionY?: "top" | "bottom";
  directionX?: "left" | "right";
  title?: string;
  items: {
    icon: React.ReactNode;
    onPress: () => void;
    title: string;
  }[];
  show: boolean;
  needDot?: boolean;
  needBg?: boolean;
  targetView?: React.ReactNode | null;
}

export default class DropDownStore {
  position = { x: 0, y: 0, width: 0, height: 0 };
  directionY: "top" | "bottom" = "bottom";
  directionX: "left" | "right" = "left";
  title = "";
  items: {
    icon: React.ReactNode;
    onPress: () => void;
    title: string;
  }[] = [
    {
      icon: null,
      onPress: () => {},
      title: "",
    },
  ];
  show = false;
  needDot = false;
  needBg = true;
  targetView?: () => {};
  constructor() {
    makeObservable(this, {
      show: observable,
      position: observable,
      needDot: observable,
      directionY: observable,
      directionX: observable,
      needBg: observable,
      setDropdown: action,
    });
  }

  setDropdown = (dropdown: DropdownProps) => {
    if (dropdown.directionY) {
      this.directionY = dropdown.directionY;
    }
    if (dropdown.directionX) {
      this.directionX = dropdown.directionX;
    }

    this.items = dropdown.items;
    this.show = dropdown.show;
    this.title = dropdown.title || "";
    this.needDot = dropdown.needDot || false;
    this.needBg = dropdown.needBg || false;
  };
}

export const dropDownStore = new DropDownStore();
