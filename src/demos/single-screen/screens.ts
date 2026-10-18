export type Screen = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  en: string;
  desc: string;
  accent: string;
  accent2: string;
  tags: string[];
};

export const screens: Screen[] = [
  {
    id: "prologue",
    index: "01",
    eyebrow: "Prologue",
    title: "余烬之上",
    en: "ABOVE THE EMBERS",
    desc: "当最后一座灯塔熄灭，旅人把名字留在了潮水里。这是序章，也是所有人重写的起点。",
    accent: "#7c5cff",
    accent2: "#45e0ff",
    tags: ["序章", "世界观"],
  },
  {
    id: "world",
    index: "02",
    eyebrow: "World",
    title: "潮汐尽头",
    en: "WHERE THE TIDE ENDS",
    desc: "七座浮岛随潮汐漂移，每一座都记着一段被抹去的历史。风穿过回廊时，会带走说谎的人。",
    accent: "#45e0ff",
    accent2: "#7c5cff",
    tags: ["地图", "设定"],
  },
  {
    id: "character",
    index: "03",
    eyebrow: "Character",
    title: "无名守望",
    en: "THE NAMELESS WATCH",
    desc: "她不记得自己的名字，却记得每一个被她送走的人。守塔人的职责是点亮，不是挽留。",
    accent: "#ff6fae",
    accent2: "#7c5cff",
    tags: ["角色", "CV"],
  },
  {
    id: "preorder",
    index: "04",
    eyebrow: "Pre-register",
    title: "启程之时",
    en: "SET FORTH",
    desc: "预约通道已开启。当第一缕潮声响起，我们会在灯塔下等你。",
    accent: "#ffbe5a",
    accent2: "#ff6fae",
    tags: ["预约", "平台"],
  },
];
