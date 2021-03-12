import { NumberBoolean, RuleValue } from "./common";

export interface User {
  id: string;
  name: string;
  username: string;
  status: NumberBoolean;
  major: string;
  department: string;
  position: string;
  rule: RuleValue
}
