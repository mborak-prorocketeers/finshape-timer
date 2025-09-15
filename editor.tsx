import { type PluginDefinition, createSchemaBuilder } from "@alfons-app/pdk";
import { name } from "./package.json";
import type Zod from "zod";
import { TimerRegular } from "@fluentui/react-icons";

const $ = createSchemaBuilder(name);

const Definition = {
  Icon: () => <TimerRegular />,
  schema: $.object({
    interval: $.number().setupInspector({ control: "Numeric" }),
    onInterval: $.reference().setupInspector({
      category: "actions",
      sourcing: "reference",
    }),
    repeat: $.boolean().default(false).setupInspector({
      control: "Switch",
    }),
  }),
  shouldAllowChild: () => () => false,
} satisfies PluginDefinition;

export default Definition;

export type Props = Zod.infer<typeof Definition.schema>;
