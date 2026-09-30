window.PHRASES = {
  cards: [
    {
      id: "full",
      title: "Restaurant card",
      lines: [
        { zh: "您好！我吃全素（和佛教吃斋一样）。", py: "Nín hǎo! Wǒ chī quán sù (hé fójiào chī zhāi yīyàng).", en: "Hello! I eat fully plant-based (like Buddhist fasting food)." },
        { zh: "我不吃任何动物的东西：", py: "Wǒ bù chī rènhé dòngwù de dōngxi:", en: "I don't eat anything from animals:" },
        { zh: "肉、鸡、鱼、海鲜、鸡蛋、牛奶、奶油、黄油、蜂蜜。", py: "ròu, jī, yú, hǎixiān, jīdàn, niúnǎi, nǎiyóu, huángyóu, fēngmì.", en: "meat, chicken, fish, seafood, eggs, milk, cream, butter, honey.", strong: true },
        { zh: "也请不要放：猪油、牛油、鸡精、鸡粉、高汤、骨头汤、蚝油、鱼露、虾皮、肉末。", py: "Yě qǐng bùyào fàng: zhūyóu, niúyóu, jījīng, jīfěn, gāotāng, gǔtou tāng, háoyóu, yúlù, xiāpí, ròumò.", en: "Please also don't add: lard, beef tallow, chicken bouillon, chicken powder, meat stock, bone broth, oyster sauce, fish sauce, dried shrimp, minced meat.", strong: true },
        { zh: "即使一点点也不可以。", py: "Jíshǐ yīdiǎndiǎn yě bù kěyǐ.", en: "Not even a little bit." },
        { zh: "可以放：植物油、盐、酱油、醋、糖、葱、姜、蒜、辣椒、花椒。", py: "Kěyǐ fàng: zhíwùyóu, yán, jiàngyóu, cù, táng, cōng, jiāng, suàn, làjiāo, huājiāo.", en: "You CAN use: vegetable oil, salt, soy sauce, vinegar, sugar, scallion, ginger, garlic, chili, Sichuan pepper.", good: true },
        { zh: "请问有什么菜可以做成全素的？麻烦您了，非常感谢！", py: "Qǐngwèn yǒu shénme cài kěyǐ zuò chéng quán sù de? Máfan nín le, fēicháng gǎnxiè!", en: "Which dishes can you make fully plant-based? Sorry for the trouble, thank you very much!" }
      ]
    },
    {
      id: "allergy",
      title: "Allergy card (last resort)",
      hint: "Kitchens often take allergies more seriously than preferences. Use only when the normal card isn't working.",
      lines: [
        { zh: "我对所有动物性食品过敏，", py: "Wǒ duì suǒyǒu dòngwùxìng shípǐn guòmǐn,", en: "I'm allergic to all animal-based foods," },
        { zh: "包括肉、鱼、海鲜、蛋、奶、猪油、鸡精、高汤、蚝油。", py: "bāokuò ròu, yú, hǎixiān, dàn, nǎi, zhūyóu, jījīng, gāotāng, háoyóu.", en: "including meat, fish, seafood, egg, dairy, lard, chicken powder, stock, oyster sauce.", strong: true },
        { zh: "吃了会很不舒服，请一定不要放。谢谢！", py: "Chī le huì hěn bù shūfu, qǐng yīdìng bùyào fàng. Xièxie!", en: "I'll get very sick, please make sure none is added. Thank you!" }
      ]
    }
  ],

  questions: [
    {
      zh: "这道菜是全素的吗？", py: "Zhè dào cài shì quán sù de ma?", en: "Is this dish fully plant-based?",
      answers: [
        { zh: "是", en: "Yes, it's vegan", v: "ok" },
        { zh: "不是", en: "No, it isn't", v: "bad" },
        { zh: "可以做成全素", en: "They can make it vegan", v: "fix" }
      ]
    },
    {
      zh: "里面有肉或者肉末吗？", py: "Lǐmiàn yǒu ròu huòzhě ròumò ma?", en: "Is there meat or minced meat in it?",
      answers: [
        { zh: "有", en: "Yes, there is", v: "bad" },
        { zh: "没有", en: "No", v: "ok" },
        { zh: "可以不放", en: "They can leave it out", v: "fix" }
      ]
    },
    {
      zh: "用猪油还是植物油炒？", py: "Yòng zhūyóu háishì zhíwùyóu chǎo?", en: "Is it cooked with lard or vegetable oil?",
      answers: [
        { zh: "猪油", en: "Lard", v: "bad" },
        { zh: "植物油", en: "Vegetable oil", v: "ok" },
        { zh: "可以用植物油", en: "They can use vegetable oil", v: "fix" }
      ]
    },
    {
      zh: "放鸡精或者鸡粉吗？", py: "Fàng jījīng huòzhě jīfěn ma?", en: "Do you add chicken bouillon or chicken powder?",
      answers: [
        { zh: "放", en: "Yes", v: "bad" },
        { zh: "不放", en: "No", v: "ok" },
        { zh: "可以不放", en: "They can leave it out", v: "fix" }
      ]
    },
    {
      zh: "汤底是骨头汤或者高汤吗？", py: "Tāng dǐ shì gǔtou tāng huòzhě gāotāng ma?", en: "Is the broth made from bones or meat stock?",
      answers: [
        { zh: "是", en: "Yes, meat/bone broth", v: "bad" },
        { zh: "不是，是清水或素汤", en: "No, plain water or veggie broth", v: "ok" },
        { zh: "可以用清水", en: "They can use plain water", v: "fix" }
      ]
    },
    {
      zh: "放蚝油吗？", py: "Fàng háoyóu ma?", en: "Is there oyster sauce?",
      answers: [
        { zh: "放", en: "Yes", v: "bad" },
        { zh: "不放", en: "No", v: "ok" },
        { zh: "可以不放", en: "They can leave it out", v: "fix" }
      ]
    },
    {
      zh: "里面有鸡蛋吗？", py: "Lǐmiàn yǒu jīdàn ma?", en: "Are there eggs in it?",
      answers: [
        { zh: "有", en: "Yes", v: "bad" },
        { zh: "没有", en: "No", v: "ok" },
        { zh: "可以不放", en: "They can leave it out", v: "fix" }
      ]
    },
    {
      zh: "有牛奶、奶油或者黄油吗？", py: "Yǒu niúnǎi, nǎiyóu huòzhě huángyóu ma?", en: "Is there milk, cream or butter?",
      answers: [
        { zh: "有", en: "Yes", v: "bad" },
        { zh: "没有", en: "No", v: "ok" },
        { zh: "可以不放", en: "They can leave it out", v: "fix" }
      ]
    },
    {
      zh: "有鱼、虾、虾皮或者鱼露吗？", py: "Yǒu yú, xiā, xiāpí huòzhě yúlù ma?", en: "Is there fish, shrimp, dried shrimp or fish sauce?",
      answers: [
        { zh: "有", en: "Yes", v: "bad" },
        { zh: "没有", en: "No", v: "ok" },
        { zh: "可以不放", en: "They can leave it out", v: "fix" }
      ]
    },
    {
      zh: "里面有蜂蜜吗？", py: "Lǐmiàn yǒu fēngmì ma?", en: "Is there honey in it?",
      answers: [
        { zh: "有", en: "Yes", v: "bad" },
        { zh: "没有", en: "No", v: "ok" },
        { zh: "可以不放", en: "They can leave it out", v: "fix" }
      ]
    },
    {
      zh: "可以用干净的锅单独炒吗？", py: "Kěyǐ yòng gānjìng de guō dāndú chǎo ma?", en: "Can you cook it separately in a clean wok?",
      answers: [
        { zh: "可以", en: "Yes, they can", v: "ok" },
        { zh: "不可以", en: "No, they can't", v: "bad" }
      ]
    },
    {
      zh: "有什么全素的菜推荐吗？请在菜单上指给我看。", py: "Yǒu shénme quán sù de cài tuījiàn ma? Qǐng zài càidān shàng zhǐ gěi wǒ kàn.", en: "Any fully plant-based dishes you'd recommend? Please point them out on the menu.",
      answers: [
        { zh: "有，我指给你看", en: "Yes, they'll point on the menu", v: "ok" },
        { zh: "没有", en: "Nothing suitable here", v: "bad" }
      ]
    }
  ],

  followups: {
    ok: { zh: "太好了，谢谢！", py: "Tài hǎo le, xièxie!", en: "Great, thank you!" },
    fix: { zh: "好的，那就麻烦您这样做，谢谢！", py: "Hǎo de, nà jiù máfan nín zhèyàng zuò, xièxie!", en: "OK, please do it that way, thank you!" },
    bad: { zh: "那不用了，谢谢！", py: "Nà bù yòng le, xièxie!", en: "Then never mind, thank you!" }
  },

  builder: {
    intro: { zh: "我吃全素。", en: "I eat fully plant-based." },
    chips: [
      { zh: "不要肉", en: "no meat" },
      { zh: "不要肉末", en: "no minced meat" },
      { zh: "不要鸡蛋", en: "no egg" },
      { zh: "不要奶", en: "no dairy" },
      { zh: "不要鱼和虾", en: "no fish/shrimp" },
      { zh: "不放猪油", en: "no lard" },
      { zh: "不放鸡精", en: "no chicken powder" },
      { zh: "不放蚝油", en: "no oyster sauce" },
      { zh: "不要高汤，用清水", en: "no stock, use water" },
      { zh: "用植物油", en: "use vegetable oil" },
      { zh: "用干净的锅", en: "use a clean wok" },
      { zh: "不要辣", en: "not spicy" },
      { zh: "微辣", en: "mildly spicy" },
      { zh: "少油", en: "less oil" },
      { zh: "少盐", en: "less salt" },
      { zh: "打包", en: "to go" }
    ],
    outro: { zh: "谢谢！", en: "Thank you!" }
  },

  useful: [
    { zh: "谢谢！", py: "Xièxie!", en: "Thank you!" },
    { zh: "这个", py: "Zhège", en: "This one (point)" },
    { zh: "我要这个，做成全素的。", py: "Wǒ yào zhège, zuò chéng quán sù de.", en: "I'll have this, made fully plant-based." },
    { zh: "一点点也不行。", py: "Yīdiǎndiǎn yě bù xíng.", en: "Not even a little." },
    { zh: "我是吃全素的，蛋和奶也不吃。", py: "Wǒ shì chī quán sù de, dàn hé nǎi yě bù chī.", en: "I'm fully plant-based, no eggs or dairy either." },
    { zh: "买单", py: "Mǎidān", en: "The bill, please" },
    { zh: "打包", py: "Dǎbāo", en: "To go / take away" },
    { zh: "不要辣", py: "Bùyào là", en: "Not spicy" },
    { zh: "微辣", py: "Wēi là", en: "Mildly spicy" },
    { zh: "多少钱？", py: "Duōshao qián?", en: "How much?" },
    { zh: "太好吃了！", py: "Tài hǎochī le!", en: "Delicious!" },
    { zh: "没关系", py: "Méi guānxi", en: "No problem" },
    { zh: "不好意思", py: "Bù hǎoyìsi", en: "Excuse me / sorry" },
    { zh: "有菜单吗？", py: "Yǒu càidān ma?", en: "Do you have a menu?" },
    { zh: "有图片菜单吗？", py: "Yǒu túpiàn càidān ma?", en: "Is there a picture menu?" },
    { zh: "附近有素食餐厅吗？", py: "Fùjìn yǒu sùshí cāntīng ma?", en: "Is there a vegetarian restaurant nearby?" },
    { zh: "换燕麦奶", py: "Huàn yànmài nǎi", en: "Switch to oat milk (cafés)" },
    { zh: "厕所在哪里？", py: "Cèsuǒ zài nǎlǐ?", en: "Where is the toilet?" }
  ]
};
