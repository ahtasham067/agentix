import type { Project } from "../types";
import { autobuffy } from "./autobuffy";
import { clinidesk } from "./clinidesk";
import { meyamb } from "./meyamb";
import { nexaAi } from "./nexa-ai";
import { nizameTaleem } from "./nizame-taleem";
import { researchBuddy } from "./research-buddy";
import { uphex } from "./uphex";

/** All portfolio projects, in display order. */
export const projects: Project[] = [
  clinidesk,
  nexaAi,
  autobuffy,
  meyamb,
  researchBuddy,
  uphex,
  nizameTaleem,
].sort((a, b) => a.sortOrder - b.sortOrder);
