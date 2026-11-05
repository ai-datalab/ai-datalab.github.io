import{_ as e}from"./createLucideIcon-CpejIyV8.js";import{X as t}from"./task-times.context-DLW2wtXN.js";var n=`EVALUATE\r
ROW(\r
    "Satisfaction", 'ProductFeedback'[Satisfaction Rate],\r
    "Total Feedback", 'ProductFeedback'[Total Feedback],\r
    "Thumbs Up", 'ProductFeedback'[Thumbs Up Count],\r
    "Thumbs Down", 'ProductFeedback'[Thumbs Down Count],\r
    "Theme Summary", 'ProductFeedback'[📊 Feedback Theme Summary]\r
)\r
`,r={"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:e},"[Total Feedback]":{name:`Total Feedback`,displayName:`Total feedback`,format:`#,0`},"[Thumbs Up]":{name:`Thumbs Up`,displayName:`Thumbs up`,format:`#,0`},"[Thumbs Down]":{name:`Thumbs Down`,displayName:`Thumbs down`,format:`#,0`},"[Theme Summary]":{name:`Theme Summary`,displayName:`Theme summary`}},i=`FILTER(ALL('Calendar'[Date]), NOT ISBLANK('Calendar'[Date]))`;function a(){return{connection:`vl`,query:n,columnMetadata:r,filters:t}}var o=`EVALUATE\r
VAR _daily =\r
    ADDCOLUMNS(\r
        SUMMARIZECOLUMNS(\r
            'Calendar'[Date],\r
            "@Total", 'ProductFeedback'[Total Feedback],\r
            "@Up", 'ProductFeedback'[Thumbs Up Count],\r
            "@Down", 'ProductFeedback'[Thumbs Down Count]\r
        ),\r
        "@WeekStart", 'Calendar'[Date] - WEEKDAY('Calendar'[Date], 2) + 1\r
    )\r
VAR _weeks =\r
    GROUPBY(\r
        FILTER(_daily, [@Total] > 0 && NOT ISBLANK('Calendar'[Date])),\r
        [@WeekStart],\r
        "@Total", SUMX(CURRENTGROUP(), [@Total]),\r
        "@Up", SUMX(CURRENTGROUP(), [@Up]),\r
        "@Down", SUMX(CURRENTGROUP(), [@Down])\r
    )\r
VAR _long =\r
    UNION(\r
        SELECTCOLUMNS(\r
            _weeks,\r
            "Week Start", [@WeekStart],\r
            "Feedback Type", "Thumbs Up",\r
            "Count", COALESCE([@Up], 0),\r
            "Signed Count", COALESCE([@Up], 0),\r
            "Satisfaction", DIVIDE(COALESCE([@Up], 0), [@Total]),\r
            "Total Feedback", [@Total]\r
        ),\r
        SELECTCOLUMNS(\r
            _weeks,\r
            "Week Start", [@WeekStart],\r
            "Feedback Type", "Thumbs Down",\r
            "Count", COALESCE([@Down], 0),\r
            "Signed Count", -COALESCE([@Down], 0),\r
            "Satisfaction", DIVIDE(COALESCE([@Up], 0), [@Total]),\r
            "Total Feedback", [@Total]\r
        )\r
    )\r
RETURN\r
FILTER(_long, [Count] > 0)\r
ORDER BY [Week Start], [Feedback Type] DESC\r
`,s={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},transform:[{calculate:`toDate(datum['Week Start'])`,as:`Week Date`},{calculate:`time(datum['Week Date'])`,as:`Week Order`},{calculate:`timeFormat(datum['Week Date'], '%-d %b')`,as:`Week`}],encoding:{x:{field:`Week`,type:`ordinal`,title:null,sort:{field:`Week Order`,op:`min`,order:`ascending`},axis:{labelAngle:0,labelOverlap:!0}},y:{field:`Signed Count`,type:`quantitative`,title:`Feedback items`,axis:{labelExpr:`compactFormat(abs(datum.value), '#,0')`}},color:{field:`Feedback Type`,type:`nominal`,title:null,sort:[`Thumbs Up`,`Thumbs Down`],legend:{orient:`top`,direction:`horizontal`}},tooltip:[{field:`Week Date`,type:`temporal`,title:`Week starting`,format:`%d %b %Y`},{field:`Feedback Type`,type:`nominal`,title:`Feedback`},{field:`Count`,type:`quantitative`,title:`Items`,format:`,.0f`},{field:`Total Feedback`,type:`quantitative`,title:`Total that week`,format:`,.0f`},{field:`Satisfaction`,type:`quantitative`,title:`Satisfaction`,format:`.0%`}]}},c={"[Week Start]":{name:`Week Start`,displayName:`Week starting`,format:`dd mmm yyyy`},"[Feedback Type]":{name:`Feedback Type`,displayName:`Feedback`},"[Count]":{name:`Count`,displayName:`Items`,format:`#,0`},"[Signed Count]":{name:`Signed Count`,displayName:`Items`,format:`#,0`},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:e},"[Total Feedback]":{name:`Total Feedback`,displayName:`Total feedback`,format:`#,0`}};function l(){return{connection:`vl`,query:o,columnMetadata:c,vegaLiteSpec:s,filters:t}}var u=`EVALUATE\r
VAR _base =\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'ProductFeedback'[FeedbackCategory],\r
            "@Total", 'ProductFeedback'[Total Feedback],\r
            "@Up", 'ProductFeedback'[Thumbs Up Count],\r
            "@Down", 'ProductFeedback'[Thumbs Down Count]\r
        ),\r
        NOT ISBLANK('ProductFeedback'[FeedbackCategory]) &&\r
            'ProductFeedback'[FeedbackCategory] <> "🧪 Testing" &&\r
            'ProductFeedback'[FeedbackCategory] <> "❓ Uncategorized" &&\r
            [@Total] > 0\r
    )\r
VAR _long =\r
    UNION(\r
        SELECTCOLUMNS(\r
            _base,\r
            "Category",\r
                VAR _category = 'ProductFeedback'[FeedbackCategory]\r
                VAR _space = SEARCH(" ", _category, 1, 0)\r
                RETURN IF(_space > 0, MID(_category, _space + 1, LEN(_category)), _category),\r
            "Feedback Type", "Thumbs Up",\r
            "Count", COALESCE([@Up], 0),\r
            "Total Feedback", [@Total],\r
            "Satisfaction", DIVIDE(COALESCE([@Up], 0), [@Total])\r
        ),\r
        SELECTCOLUMNS(\r
            _base,\r
            "Category",\r
                VAR _category = 'ProductFeedback'[FeedbackCategory]\r
                VAR _space = SEARCH(" ", _category, 1, 0)\r
                RETURN IF(_space > 0, MID(_category, _space + 1, LEN(_category)), _category),\r
            "Feedback Type", "Thumbs Down",\r
            "Count", COALESCE([@Down], 0),\r
            "Total Feedback", [@Total],\r
            "Satisfaction", DIVIDE(COALESCE([@Up], 0), [@Total])\r
        )\r
    )\r
RETURN\r
FILTER(_long, [Count] > 0)\r
ORDER BY [Total Feedback] DESC, [Feedback Type] DESC\r
`,d={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Category`,type:`nominal`,title:null,sort:{field:`Total Feedback`,op:`max`,order:`descending`},axis:{labelLimit:220}},x:{field:`Count`,type:`quantitative`,title:`Feedback items`,stack:`zero`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}},color:{field:`Feedback Type`,type:`nominal`,title:null,sort:[`Thumbs Up`,`Thumbs Down`],legend:{orient:`top`,direction:`horizontal`}},tooltip:[{field:`Category`,type:`nominal`,title:`Category`},{field:`Feedback Type`,type:`nominal`,title:`Feedback`},{field:`Count`,type:`quantitative`,title:`Items`,format:`,.0f`},{field:`Total Feedback`,type:`quantitative`,title:`Total in category`,format:`,.0f`},{field:`Satisfaction`,type:`quantitative`,title:`Satisfaction`,format:`.0%`}]}},f={"[Category]":{name:`Category`,displayName:`Category`},"[Feedback Type]":{name:`Feedback Type`,displayName:`Feedback`},"[Count]":{name:`Count`,displayName:`Items`,format:`#,0`},"[Total Feedback]":{name:`Total Feedback`,displayName:`Total feedback`,format:`#,0`},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:e}};function p(){return{connection:`vl`,query:u,columnMetadata:f,vegaLiteSpec:d,filters:t}}var m=`EVALUATE\r
TOPN(\r
    20,\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'ProductFeedback'[Surface / Agent],\r
                "@Total", 'ProductFeedback'[Total Feedback],\r
                "@Up", 'ProductFeedback'[Thumbs Up Count],\r
                "@Down", 'ProductFeedback'[Thumbs Down Count],\r
                "@Satisfaction", 'ProductFeedback'[Satisfaction Rate]\r
            ),\r
            [@Total] >= 5 && NOT ISBLANK('ProductFeedback'[Surface / Agent])\r
        ),\r
        "Surface / Agent", 'ProductFeedback'[Surface / Agent],\r
        "Total Feedback", [@Total],\r
        "Thumbs Up", COALESCE([@Up], 0),\r
        "Thumbs Down", COALESCE([@Down], 0),\r
        "Satisfaction", [@Satisfaction]\r
    ),\r
    [Total Feedback], DESC\r
)\r
ORDER BY [Satisfaction] DESC, [Total Feedback] DESC\r
`,h={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`datum['Thumbs Up'] + datum['Thumbs Down']`,as:`Rated`},{fold:[`Thumbs Up`,`Thumbs Down`],as:[`Feedback Type`,`Count`]},{filter:`datum.Rated > 0`},{calculate:`datum.Count / datum.Rated`,as:`Share`},{calculate:`datum['Feedback Type'] === 'Thumbs Down' ? -datum.Share : datum.Share`,as:`Signed Share`}],mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Surface / Agent`,type:`nominal`,title:null,sort:{field:`Satisfaction`,op:`max`,order:`descending`},axis:{labelLimit:220}},x:{field:`Signed Share`,type:`quantitative`,title:`Share of ratings: thumbs down to the left, thumbs up to the right`,stack:`zero`,scale:{domain:[-1,1]},axis:{labelExpr:`format(abs(datum.value), '.0%')`,tickCount:5}},color:{field:`Feedback Type`,type:`nominal`,title:null,sort:[`Thumbs Up`,`Thumbs Down`],legend:{orient:`top`,direction:`horizontal`}},tooltip:[{field:`Surface / Agent`,type:`nominal`,title:`Surface or agent`},{field:`Feedback Type`,type:`nominal`,title:`Feedback`},{field:`Count`,type:`quantitative`,title:`Items`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share of ratings`,format:`.0%`},{field:`Satisfaction`,type:`quantitative`,title:`Satisfaction`,format:`.0%`},{field:`Total Feedback`,type:`quantitative`,title:`Feedback items`,format:`,.0f`}]}},g={"[Surface / Agent]":{name:`Surface / Agent`,displayName:`Surface or agent`},"[Total Feedback]":{name:`Total Feedback`,displayName:`Total feedback`,format:`#,0`},"[Thumbs Up]":{name:`Thumbs Up`,displayName:`Thumbs up`,format:`#,0`},"[Thumbs Down]":{name:`Thumbs Down`,displayName:`Thumbs down`,format:`#,0`},"[Satisfaction]":{name:`Satisfaction`,displayName:`Satisfaction`,format:e}};function _(){return{connection:`vl`,query:m,columnMetadata:g,vegaLiteSpec:h,filters:t}}var v=`EVALUATE\r
TOPN(\r
    50,\r
    SELECTCOLUMNS(\r
        FILTER(\r
            'ProductFeedback',\r
            NOT ISBLANK('ProductFeedback'[Comment]) && LEN(TRIM('ProductFeedback'[Comment])) > 0\r
        ),\r
        "Date Submitted", 'ProductFeedback'[Date Submitted Date],\r
        "Feedback Type", 'ProductFeedback'[FeedbackType],\r
        "Feedback Emoji", 'ProductFeedback'[FeedbackEmoji],\r
        "Category",\r
            VAR _category = 'ProductFeedback'[FeedbackCategory]\r
            VAR _space = SEARCH(" ", _category, 1, 0)\r
            RETURN IF(_space > 0, MID(_category, _space + 1, LEN(_category)), _category),\r
        "Surface / Agent", 'ProductFeedback'[Surface / Agent],\r
        "Comment", 'ProductFeedback'[Comment]\r
    ),\r
    [Date Submitted], DESC\r
)\r
ORDER BY [Date Submitted] DESC\r
`,y={"[Date Submitted]":{name:`Date Submitted`,displayName:`Date submitted`,format:`dd mmm yyyy`},"[Feedback Type]":{name:`Feedback Type`,displayName:`Feedback`},"[Feedback Emoji]":{name:`Feedback Emoji`,displayName:`Signal`},"[Category]":{name:`Category`,displayName:`Category`},"[Surface / Agent]":{name:`Surface / Agent`,displayName:`Surface or agent`},"[Comment]":{name:`Comment`,displayName:`Comment`}};function b(){return{connection:`vl`,query:v,columnMetadata:y,filters:t}}export{i as a,l as i,_ as n,a as o,p as r,b as t};