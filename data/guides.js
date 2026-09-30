window.GUIDES = [
  {
    id: "hotpot",
    icon: "🍲",
    title: "Hotpot 火锅",
    sections: [
      { h: "Broth (锅底)", items: [
        "✅ Ask for 清水锅底 (plain water) or 素锅底 (veg broth). Most places will do it.",
        "⚠️ 番茄锅底 (tomato) and 菌汤锅底 (mushroom) are usually made with chicken or bone stock. Ask: 是素的吗？有没有骨头汤？",
        "❌ 牛油锅底 (Chongqing red broth) is made with beef tallow. Some places have 清油锅底 (vegetable oil spicy broth), so ask for it.",
        "🔀 鸳鸯锅 (split pot) doesn't prevent cross-contamination if your friends dip meat on the other side, but it's a reasonable compromise."
      ]},
      { h: "Good things to order", items: [
        "土豆片 potato · 藕片 lotus root · 冬瓜 winter melon · 豆腐 tofu · 冻豆腐 frozen tofu · 腐竹 tofu skin sticks · 豆皮 tofu sheet · 魔芋 konjac · 宽粉 wide sweet-potato noodles · 金针菇 enoki · 香菇 shiitake · 木耳 wood ear · 海带 kelp · 生菜 lettuce · 茼蒿 crown daisy · 娃娃菜 baby cabbage · 玉米 corn · 山药 yam",
        "⚠️ 面筋 / 油面筋 (gluten puffs) are usually fine, but ask. ⚠️ 手工面 may contain egg: 有鸡蛋吗？"
      ]},
      { h: "Dipping sauce bar (调料台)", items: [
        "✅ Build your own 香油碟: sesame oil + garlic + cilantro + scallion + salt. Add chili oil, vinegar and soy sauce.",
        "⚠️ 麻酱 (sesame paste) is usually vegan, but pre-mixed versions can contain oyster sauce or seafood sauce (海鲜酱).",
        "❌ Skip 蚝油 oyster sauce, 海鲜酱 seafood sauce, 沙茶酱 shacha (contains shrimp/fish) and 牛肉酱 beef paste."
      ]},
      { h: "Say this", phrases: [
        { zh: "我要清水锅底，不要骨头汤，不放鸡精，谢谢！", en: "Plain water broth, no bone stock, no chicken powder, thanks!" },
        { zh: "有清油锅底吗？不要牛油。", en: "Do you have a vegetable-oil spicy broth? No beef tallow." }
      ]}
    ]
  },
  {
    id: "breakfast",
    icon: "🥟",
    title: "Breakfast 早餐",
    sections: [
      { h: "Usually safe", items: [
        "✅ 豆浆 soy milk (sweet 甜 or plain 原味). The most reliable breakfast item",
        "✅ 白粥 plain rice porridge, 小米粥 millet porridge (the pickles 咸菜 on the side are usually fine)",
        "✅ 馒头 plain steamed bun, 花卷 flower roll",
        "✅ 烤红薯 roasted sweet potato, 玉米 corn on the cob",
        "✅ 素包子 veg buns with cabbage, mushroom, tofu or glass noodles (ask about egg)"
      ]},
      { h: "Ask first", items: [
        "⚠️ 油条 fried dough: the dough is usually vegan, but some add egg or fry in lard",
        "⚠️ 素包子: 韭菜鸡蛋 (chive & egg) is the most common 'vegetarian' filling. Ask 有鸡蛋吗？",
        "⚠️ 葱油饼 scallion pancake: often lard in the dough",
        "⚠️ 豆腐脑 tofu pudding: the sweet version (甜) is usually vegan. The savory version (咸) often has shrimp, meat sauce or egg"
      ]},
      { h: "Avoid", items: [
        "❌ 煎饼果子 (crepe with egg). Can sometimes be made 不要鸡蛋, but the sauce may contain shrimp paste",
        "❌ 咸豆浆 savory soy milk (dried shrimp, pork floss) · 茶叶蛋 tea eggs · 小笼包 soup dumplings (pork) · 肉包 meat buns · 鸡蛋饼 egg pancake"
      ]}
    ]
  },
  {
    id: "store",
    icon: "🏪",
    title: "Convenience store & supermarket",
    sections: [
      { h: "Quick wins at 7-Eleven / 全家 FamilyMart / 罗森 Lawson", items: [
        "✅ 烤红薯 sweet potato and 玉米 corn at the counter",
        "✅ 豆腐干 / 卤豆干 spiced tofu (check the label for 鸡精), 花生 peanuts, 坚果 nuts, fruit",
        "✅ Plain soy milk 豆奶 (e.g. 维他奶 Vitasoy original), 燕麦奶 oat milk",
        "⚠️ 饭团 rice balls, 三明治 sandwiches and 便当 bento: almost all contain meat, egg or mayo",
        "⚠️ 方便面 instant noodles: the seasoning packets almost always contain beef, chicken or lard. Look for 素食 on the pack"
      ]},
      { h: "Reading the ingredient list (配料表)", items: [
        "Find the 配料 / 配料表 box and look for these characters:"
      ], keywords: [
        { zh: "乳 / 奶 / 奶粉", en: "milk / milk powder" },
        { zh: "乳清", en: "whey" },
        { zh: "酪蛋白（酸钠）", en: "casein (sodium caseinate)" },
        { zh: "黄油 / 奶油 / 芝士", en: "butter / cream / cheese" },
        { zh: "蛋 / 蛋白 / 蛋黄", en: "egg / egg white / yolk" },
        { zh: "明胶", en: "gelatin" },
        { zh: "猪油 / 牛油 / 动物油", en: "lard / tallow / animal fat" },
        { zh: "起酥油", en: "shortening (can be animal, ask)" },
        { zh: "鸡精 / 鸡肉粉 / 牛肉粉", en: "chicken / beef powder" },
        { zh: "骨 / 肉", en: "bone / meat" },
        { zh: "鱼 / 虾 / 蚝 / 贝", en: "fish / shrimp / oyster / shellfish" },
        { zh: "蜂蜜 / 蜂胶", en: "honey / propolis" },
        { zh: "胭脂虫红", en: "carmine (red dye)" },
        { zh: "虫胶 / 紫胶", en: "shellac (candy glaze)" }
      ]},
      { h: "Good signs on packaging", items: [
        "✅ 纯素 (vegan) · 植物基 (plant-based) · 素食 (vegetarian, but check for 蛋/奶)",
        "💡 Tip: iPhone Live Text (works offline) or Android's camera text selection can copy text from a label. Paste it into the Dishes search to check keywords."
      ]}
    ]
  },
  {
    id: "delivery",
    icon: "🛵",
    title: "Food delivery (Meituan / Ele.me)",
    sections: [
      { h: "How", items: [
        "Search 纯素 or 素食 in the Meituan / Ele.me (饿了么) mini-program inside Alipay or WeChat.",
        "Always fill in the 备注 (remarks) field when you order. Tap below to copy the remark text."
      ]},
      { h: "Copy into the 备注 field", phrases: [
        { zh: "我吃全素，请不要放肉、肉末、鸡蛋、奶、猪油、鸡精、高汤、蚝油，用植物油，谢谢！", en: "Full plant-based remark", copy: true },
        { zh: "全素，不放荤油和鸡精，谢谢！", en: "Short remark", copy: true }
      ]}
    ]
  },
  {
    id: "travel",
    icon: "🚄",
    title: "Trains, flights & long days",
    sections: [
      { h: "High-speed rail", items: [
        "Train food is almost all meat. Bring your own: fruit, nuts, 豆干, bread (check for 奶/蛋), instant noodles marked 素食.",
        "Every train has free hot water (热水), so instant noodles or oats work well.",
        "The 12306 app lets you order station restaurant food to your seat, but vegan options are rare."
      ]},
      { h: "Flights", items: [
        "Request a vegan meal (VGML) when you book, at least 48h before. Chinese airlines sometimes serve Asian vegetarian (AVML) instead, which can have dairy, so confirm."
      ]},
      { h: "Emergency food", items: [
        "✅ 白米饭 plain rice + 拍黄瓜 smashed cucumber + 清炒时蔬 stir-fried greens (with the card) is available almost everywhere.",
        "✅ Fruit stands (水果店) are everywhere and cheap.",
        "✅ 烤红薯 street roasted sweet potato."
      ]}
    ]
  },
  {
    id: "culture",
    icon: "🙏",
    title: "How to talk about it",
    sections: [
      { h: "What works", items: [
        "Frame it as Buddhist food. 吃斋 and 全素 are concepts every cook already knows. 'Vegan' (素食主义者) is abstract; 'like a monk' is concrete.",
        "List the hidden ingredients by name. To many cooks, lard, chicken powder and stock aren't 'meat'. They're just seasoning.",
        "Say 一点点也不行 (not even a little). A 'little' minced pork on top is often seen as harmless.",
        "Be warm and grateful: 麻烦您了 (sorry for the trouble) and 谢谢 go a long way. Smile, point, and say thank you twice.",
        "Choose places that cook to order (炒菜馆) over places with pre-made pots or trays."
      ]},
      { h: "Useful words", keywords: [
        { zh: "全素", en: "fully plant-based" },
        { zh: "纯素", en: "vegan (modern term)" },
        { zh: "吃斋", en: "eat Buddhist fasting food" },
        { zh: "蛋奶素", en: "lacto-ovo vegetarian (NOT you)" },
        { zh: "荤", en: "meat / animal-derived (opposite of 素)" },
        { zh: "荤油", en: "animal fat" },
        { zh: "素的", en: "plant-based (adj.)" }
      ]}
    ]
  }
];
