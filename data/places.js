window.PLACES = {
  keywords: [
    { zh: "纯素", en: "Pure vegan. A modern term, most precise, fewer results", best: true },
    { zh: "全素", en: "Fully plant-based, widely understood" },
    { zh: "素食", en: "Vegetarian food, the broadest search" },
    { zh: "素菜馆", en: "Vegetarian restaurant" },
    { zh: "素食自助", en: "Vegetarian buffet. Cheap, often near temples, lunch only" },
    { zh: "寺庙素斋", en: "Temple vegetarian meal. Most reliable", best: true },
    { zh: "斋菜", en: "Buddhist fasting dishes" },
    { zh: "素斋", en: "Buddhist vegetarian meal" },
    { zh: "斋堂", en: "Temple dining hall" },
    { zh: "植物肉", en: "Plant-based meat" },
    { zh: "轻食沙拉", en: "Salad / light-meal places (ask about egg, cheese & dressing)" },
    { zh: "印度餐厅", en: "Indian restaurant (ask about ghee 酥油 and cream)" }
  ],

  apps: [
    { id: "amap", name: "Amap 高德地图", note: "Best maps in China. Search near you.", url: "https://uri.amap.com/search?keyword={q}&callnative=1" },
    { id: "apple", name: "Apple Maps", note: "Uses Amap data inside China, works well", url: "maps://?q={q}" },
    { id: "baidu", name: "Baidu Maps 百度地图", note: "Alternative map", url: "baidumap://map/place/search?query={q}&src=ios.suishitong" },
    { id: "dianping", name: "Dianping 大众点评", note: "China's Yelp. Keyword gets copied, paste into search", url: "dianping://", copy: true },
    { id: "meituan", name: "Meituan 美团", note: "Delivery + reviews. Keyword gets copied, paste into search", url: "imeituan://", copy: true }
  ],

  tips: [
    { t: "Temples are your safest bet", d: "Many Buddhist temples run a 斋堂 or 素斋 restaurant. The food is traditionally free of meat, eggs and dairy. Often lunch only (≈11:00–13:00), sometimes a cheap buffet. Search 寺庙素斋 or ask at the temple: 请问这里有素斋吗？" },
    { t: "素食 ≠ vegan", d: "Many vegetarian restaurants are 蛋奶素 (lacto-ovo) and serve eggs, milk, cheese and cream. Even there, show the card and ask about egg (蛋) and dairy (奶). Look for 纯素 on signs and menus." },
    { t: "Mock meat is normal here", d: "Buddhist cuisine has centuries of 素鸡, 素鸭, 素肉 and 烤麸 (gluten and tofu skin). A menu listing 'duck' or 'pork' at a vegetarian restaurant is almost always mock meat. Ask to be sure: 这是素的吗？" },
    { t: "Read Dianping reviews for 纯素", d: "In Dianping, search 纯素 and sort by distance (距离). Open a place and search its reviews (评价) for 纯素, 蛋, 奶 to see what people say. Menu photos (菜单) are usually uploaded by diners." },
    { t: "Chinese food apps need a Chinese phone number", d: "Dianping, Meituan and Taobao usually need a Chinese number to sign up. Alipay and WeChat accept foreign cards and have mini-programs for Meituan and Dianping, so set these up before you travel." },
    { t: "Chain options", d: "Cafés: Luckin (瑞幸) and Starbucks China offer oat milk (燕麦奶). Say 换燕麦奶. Hema (盒马) supermarkets stock plant-based milks, tofu products and snacks. Indian and Middle-Eastern restaurants in big cities usually have vegan dishes (ask about ghee 酥油, cream 奶油, yogurt 酸奶)." },
    { t: "Before you go", d: "Download HappyCow city listings and screenshot the places you want, because some foreign sites load slowly or not at all in China. Save each address in Chinese, since taxi drivers can't read English." },
    { t: "Lunch is easier than dinner", d: "Vegetarian buffets and temple halls are mostly lunch-only. Plan your big vegan meal at noon and keep dinner simple (a safe stir-fry plus rice)." }
  ]
};
