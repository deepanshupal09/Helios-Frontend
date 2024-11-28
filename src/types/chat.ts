export type Chat = {
  active?: any;
  seen?: boolean;
  avatar: string;
  name: string;
  text: string;
  time: string;
  textCount: number;
  dot: number;
};
export interface Chat2 {
  active: boolean | null;
  avatar: string;
  name: string;
  textCount: string;
  dot: number;
  valu?: "max" | "min" | null; 
  meterType?: "SubMeter 1" | "SubMeter 2" | "SubMeter 3"; 
}
