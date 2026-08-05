import { mutation, query } from "./_generated/server";

const OFFICERS = [
  ["टेक सिंह गौतम", "राष्ट्रीय अध्यक्ष", "उत्तर प्रदेश"], ["बी.पी. गौतम", "राष्ट्रीय प्रधान महासचिव", "दिल्ली"], ["राजकुमार गौतम", "राष्ट्रीय कोषाध्यक्ष", "दिल्ली"],
  ["बोधाचार्य गंगा सागर", "राष्ट्रीय उपाध्यक्ष", "दिल्ली"], ["यशपाल सिंह", "राष्ट्रीय उपाध्यक्ष", "दिल्ली"], ["कमल सिंह बौध", "राष्ट्रीय उपाध्यक्ष", "दिल्ली"],
  ["के.एस. राणा", "राष्ट्रीय उपाध्यक्ष", "उत्तर प्रदेश"], ["संगीता रानी", "राष्ट्रीय उपाध्यक्ष", "उत्तर प्रदेश"], ["राकेश वर्मा", "राष्ट्रीय उपाध्यक्ष", "राजस्थान"],
  ["ओंकार भाटिया", "राष्ट्रीय उपाध्यक्ष", "हिमाचल प्रदेश"], ["कृष्णा भाटी", "राष्ट्रीय उपाध्यक्ष", "उत्तर प्रदेश"], ["देव कुमार बौध", "राष्ट्रीय उपाध्यक्ष", "दिल्ली"],
  ["सी.पी. सिंह", "राष्ट्रीय महासचिव", "दिल्ली"], ["प्यारेलाल भारती", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"], ["रामवीर सिंह गौतम", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"],
  ["डी.पी. सिंह", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"], ["प्रेम सिंह वरुण", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"], ["सुरजीत सिंह गौतम", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"],
  ["महेन्दर सिंह एडवोकेट", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"], ["लेखराज सिंह बौध", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"], ["नर्देव सिंह", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"],
  ["राज बहादुर सिंह", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"], ["सतबीर सिंह", "राष्ट्रीय महासचिव", "दिल्ली"], ["बिरबल सिंह बिदला", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"],
  ["विक्रम सिंह", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"], ["अमर सावरकर", "राष्ट्रीय महासचिव", "म.प्र./छ.ग."], ["धर्मवीर सिंह", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"],
  ["सिया नन्द भारती", "राष्ट्रीय महासचिव", "उत्तर प्रदेश"], ["गया सिंह गौतम", "राष्ट्रीय सचिव", "दिल्ली"], ["वी.के. कंचन", "राष्ट्रीय सचिव", "राजस्थान"],
  ["चंद्रभान सिंह", "राष्ट्रीय सचिव", "दिल्ली"], ["केहर सिंह परधान", "राष्ट्रीय उपाध्यक्ष", "उत्तर प्रदेश"], ["आदित्य बौध", "राष्ट्रीय सचिव", "मध्य प्रदेश"],
  ["जे.आर. निराला", "राष्ट्रीय उपाध्यक्ष", "दिल्ली"], ["धारा सिंह", "राष्ट्रीय सचिव", "उत्तर प्रदेश"], ["नन्द किशोर", "राष्ट्रीय सचिव", "उत्तर प्रदेश"],
  ["बच्चू सिंह", "राष्ट्रीय सचिव", "राजस्थान"], ["रविश चन्द एडवोकेट", "राष्ट्रीय सचिव", "उत्तर प्रदेश"], ["प्रदीप कुमार अशोक एडवोकेट", "राष्ट्रीय सचिव", "उत्तर प्रदेश"],
  ["सुनील कुमार", "राष्ट्रीय सचिव", "दिल्ली"], ["शंकर कैमैवाल", "राष्ट्रीय सचिव", "उत्तर प्रदेश"], ["घनश्याम परधान", "राष्ट्रीय सचिव", "उत्तर प्रदेश"],
  ["भानु भाई चौहान", "राष्ट्रीय सचिव", "गुजरात"], ["श्रीनाथ बौध", "राष्ट्रीय सचिव", "बिहार"], ["डल्ला भाई राव", "राष्ट्रीय सचिव", "राजस्थान"],
  ["ललित कुमार सागर", "राष्ट्रीय सचिव", "दिल्ली"], ["प्रताप सिंह", "राष्ट्रीय सचिव", "उत्तर प्रदेश"], ["पन्नालाल बौद्ध", "राष्ट्रीय सचिव", "उत्तर प्रदेश"],
] as const;

const nameMap: Record<string, string> = {
  "टेक सिंह गौतम": "Tek Singh Gautam",
  "बी.पी. गौतम": "B.P. Gautam",
  "राजकुमार गौतम": "Rajkumar Gautam",
  "बोधाचार्य गंगा सागर": "Bodhyacharya Ganga Sagar",
  "यशपाल सिंह": "Yashpal Singh",
  "कमल सिंह बौध": "Kamal Singh Baudh",
  "के.एस. राणा": "K.S. Rana",
  "संगीता रानी": "Sangeeta Rani",
  "राकेश वर्मा": "Rakesh Verma",
  "ओंकार भाटिया": "Omkar Bhatia",
  "कृष्णा भाटी": "Krishna Bhati",
  "देव कुमार बौध": "Dev Kumar Baudh",
  "सी.पी. सिंह": "C.P. Singh",
  "प्यारेलाल भारती": "Pyarelal Bharti",
  "रामवीर सिंह गौतम": "Ramveer Singh Gautam",
  "डी.पी. सिंह": "D.P. Singh",
  "प्रेम सिंह वरुण": "Prem Singh Varun",
  "सुरजीत सिंह गौतम": "Surjeet Singh Gautam",
  "महेन्दर सिंह एडवोकेट": "Mahendra Singh Advocate",
  "लेखराज सिंह बौध": "Lekhraj Singh Baudh",
  "नर्देव सिंह": "Nardev Singh",
  "राज बहादुर सिंह": "Raj Bahadur Singh",
  "सतबीर सिंह": "Satbir Singh",
  "बिरबल सिंह बिदला": "Birbal Singh Bidla",
  "विक्रम सिंह": "Vikram Singh",
  "अमर सावरकर": "Amar Savarkar",
  "धर्मवीर सिंह": "Dharmaveer Singh",
  "सिया नन्द भारती": "Sia Nand Bharti",
  "गया सिंह गौतम": "Gaya Singh Gautam",
  "वी.के. कंचन": "V.K. Kanchan",
  "चंद्रभान सिंह": "Chandrabhan Singh",
  "केहर सिंह परधान": "Kehar Singh Pradhan",
  "आदित्य बौध": "Aditya Baudh",
  "जे.आर. निराला": "J.R. Nirala",
  "धारा सिंह": "Dhara Singh",
  "नन्द किशोर": "Nand Kishore",
  "बच्चू सिंह": "Bachchu Singh",
  "रविश चन्द एडवोकेट": "Ravish Chand Advocate",
  "प्रदीप कुमार अशोक एडवोकेट": "Pradeep Kumar Ashok Advocate",
  "सुनील कुमार": "Sunil Kumar",
  "शंकर कैमैवाल": "Shankar Kaimawal",
  "घनश्याम परधान": "Ghanshyam Pradhan",
  "भानु भाई चौहान": "Bhanu Bhai Chauhan",
  "श्रीनाथ बौध": "Srinath Baudh",
  "डल्ला भाई राव": "Dalla Bhai Rao",
  "ललित कुमार सागर": "Lalit Kumar Sagar",
  "प्रताप सिंह": "Pratap Singh",
  "पन्नालाल बौद्ध": "Pannalal Bauddha",
};

const designationMap: Record<string, string> = {
  "राष्ट्रीय अध्यक्ष": "National President",
  "राष्ट्रीय प्रधान महासचिव": "National General Secretary",
  "राष्ट्रीय कोषाध्यक्ष": "National Treasurer",
  "राष्ट्रीय उपाध्यक्ष": "National Vice President",
  "राष्ट्रीय महासचिव": "National Secretary",
  "राष्ट्रीय सचिव": "National Joint Secretary",
};

const stateMap: Record<string, string> = {
  "उत्तर प्रदेश": "Uttar Pradesh",
  "दिल्ली": "Delhi",
  "राजस्थान": "Rajasthan",
  "हिमाचल प्रदेश": "Himachal Pradesh",
  "म.प्र./छ.ग.": "Madhya Pradesh/Chhattisgarh",
  "मध्य प्रदेश": "Madhya Pradesh",
  "गुजरात": "Gujarat",
  "बिहार": "Bihar",
};

export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query("nationalOfficers").withIndex("by_order").order("asc").filter((q) => q.eq(q.field("isActive"), true)).collect(),
});

/** Run once after deploying the schema to populate the official directory. */
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("nationalOfficers").collect();
    if (existing.length) return { inserted: 0, message: "National officer directory already seeded" };
    for (const [index, [name, designation, state]] of OFFICERS.entries()) {
      await ctx.db.insert("nationalOfficers", {
        name,
        nameEn: nameMap[name] || name,
        designation,
        designationEn: designationMap[designation] || designation,
        state,
        stateEn: stateMap[state] || state,
        displayOrder: index + 1,
        isActive: true,
      });
    }
    return { inserted: OFFICERS.length, message: "National officer directory seeded" };
  },
});

/** Clear and re-seed the national officer directory. */
export const reseed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("nationalOfficers").collect();
    for (const officer of existing) {
      await ctx.db.delete(officer._id);
    }
    for (const [index, [name, designation, state]] of OFFICERS.entries()) {
      await ctx.db.insert("nationalOfficers", {
        name,
        nameEn: nameMap[name] || name,
        designation,
        designationEn: designationMap[designation] || designation,
        state,
        stateEn: stateMap[state] || state,
        displayOrder: index + 1,
        isActive: true,
      });
    }
    return { inserted: OFFICERS.length, message: "National officer directory re-seeded" };
  },
});