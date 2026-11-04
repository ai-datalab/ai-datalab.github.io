import{f as e,h as t}from"./utils-DUYIo-F3.js";var n=`EVALUATE\r
ROW(\r
    "Total Licensed Users", [Total Licensed Users],\r
    "Avg Days Since Last Active", [Avg Days Since Last Active],\r
    "License Evidence Notice", [License Evidence Notice],\r
    "Reclaim Cost Notice", [Reclaim Cost Notice],\r
    "License Inventory Usable", [License Inventory Usable]\r
)\r
`,r={"[Total Licensed Users]":{name:`Total Licensed Users`,displayName:`Total licensed users`,format:`#,0`},"[Avg Days Since Last Active]":{name:`Avg Days Since Last Active`,displayName:`Avg days since last active`,format:e},"[License Evidence Notice]":{name:`License Evidence Notice`,displayName:`License evidence notice`},"[Reclaim Cost Notice]":{name:`Reclaim Cost Notice`,displayName:`Reclaim cost notice`},"[License Inventory Usable]":{name:`License Inventory Usable`,displayName:`License inventory usable`}};function i(){return{connection:`vl`,query:n,columnMetadata:r}}var a=`EVALUATE\r
-- The model's \`License Priority Rank (Dynamic)\` scores every user in the\r
-- selection again for each row it ranks, so its cost grows with the square of\r
-- the user count. Each user is scored once here instead. Inside the measure,\r
-- ALLSELECTED brings back the filters this query runs under, which are the\r
-- users VALUES sees here, and its dense rank is one more than the number of\r
-- distinct higher scores.\r
VAR __Scored =\r
    FILTER(\r
        ADDCOLUMNS(\r
            VALUES('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
            "@Score", [License Priority Score (User)]\r
        ),\r
        NOT ISBLANK([@Score])\r
    )\r
-- The rank counts users with any unlicensed activity, whatever the licence filter says.\r
VAR __Scores =\r
    DISTINCT(\r
        SELECTCOLUMNS(\r
            FILTER(\r
                __Scored,\r
                CALCULATE(\r
                    COUNTROWS('Chat + Agent Interactions (Audit Logs)'),\r
                    'Chat + Agent Interactions (Audit Logs)'[License Status] = "Unlicensed"\r
                ) > 0\r
            ),\r
            "@Value", [@Score]\r
        )\r
    )\r
VAR __Candidates =\r
    ADDCOLUMNS(\r
        FILTER(__Scored, CALCULATE([Observed Unlicensed Sessions]) > 0),\r
        "@Sessions", [Observed Unlicensed Sessions per User per Week]\r
    )\r
VAR __Total = COUNTROWS(__Candidates)\r
RETURN\r
SELECTCOLUMNS(\r
    TOPN(\r
        1000,\r
        __Candidates,\r
        [@Score], DESC,\r
        [@Sessions], DESC,\r
        'Chat + Agent Interactions (Audit Logs)'[Audit_UserId], ASC\r
    ),\r
    "Rank",\r
        VAR __Score = [@Score]\r
        RETURN COUNTROWS(FILTER(__Scores, [@Value] > __Score)) + 1,\r
    "User", 'Chat + Agent Interactions (Audit Logs)'[Audit_UserId],\r
    "Organization",\r
        LOOKUPVALUE(\r
            'Chat + Agent Org Data'[Organization],\r
            'Chat + Agent Org Data'[PersonId], 'Chat + Agent Interactions (Audit Logs)'[Audit_UserId]\r
        ),\r
    "Priority Score", [@Score],\r
    "Sessions Per Week", [@Sessions],\r
    "Active Days Per Week", [Median Chat + Agent Active Days Per User Per Week (Unlicensed)],\r
    "Total", __Total\r
)\r
ORDER BY [Rank], [Priority Score] DESC, [Sessions Per Week] DESC, [User]`,o={"[Rank]":{name:`Rank`,displayName:`Rank`,format:`#,0`},"[User]":{name:`User`,displayName:`User`},"[Organization]":{name:`Organization`,displayName:`Organization`},"[Priority Score]":{name:`Priority Score`,displayName:`Priority score`,format:`#,0`},"[Sessions Per Week]":{name:`Sessions Per Week`,displayName:`Sessions per week`,format:`0.0`},"[Active Days Per Week]":{name:`Active Days Per Week`,displayName:`Active days per week`,format:`0.0`},...t};function s(){return{connection:`vl`,query:a,columnMetadata:o}}var c=`EVALUATE\r
VAR _base =\r
    ADDCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Chat + Agent Interactions (Audit Logs)'[Audit_UserId],\r
                "@Tasks", [Median Unlicensed AI Tasks Per User Per Week],\r
                "@Days", [Median Chat + Agent Active Days Per User Per Week (Unlicensed)],\r
                "@Sessions", [Observed Unlicensed Sessions per User per Week],\r
                "@Observed", [Observed Unlicensed Sessions]\r
            ),\r
            [@Tasks] > 0 && [@Days] > 0 && [@Observed] > 0\r
        ),\r
        "@Breadth",\r
            CALCULATE(\r
                AVERAGE('M365 Activity'[WorkloadsActive]),\r
                'M365 Activity'[WorkloadsActive] > 0,\r
                TREATAS({ 'Chat + Agent Interactions (Audit Logs)'[Audit_UserId] }, 'M365 Activity'[UPN_Normalized])\r
            )\r
    )\r
VAR _scored =\r
    ADDCOLUMNS(\r
        _base,\r
        "@Score",\r
            VAR _volume = MIN(DIVIDE([@Tasks], 30, 0), 1)\r
            VAR _days = MIN(DIVIDE([@Days], 5, 0), 1)\r
            RETURN\r
                ROUND(\r
                    IF(\r
                        ISBLANK([@Breadth]),\r
                        60 * _volume + 40 * _days,\r
                        50 * _volume + 30 * _days + 20 * MIN(DIVIDE([@Breadth], 4, 0), 1)\r
                    ),\r
                    0\r
                )\r
    )\r
-- A dense rank is one more than the number of distinct higher scores; scores\r
-- are whole numbers from 0 to 100, so this stays cheap however many people rank.\r
VAR _scores = DISTINCT(SELECTCOLUMNS(_scored, "@Value", [@Score]))\r
VAR _total = COUNTROWS(_scored)\r
RETURN\r
SELECTCOLUMNS(\r
    TOPN(\r
        1000,\r
        _scored,\r
        [@Score], DESC,\r
        [@Sessions], DESC,\r
        'Chat + Agent Interactions (Audit Logs)'[Audit_UserId], ASC\r
    ),\r
    "Rank",\r
        VAR _score = [@Score]\r
        RETURN COUNTROWS(FILTER(_scores, [@Value] > _score)) + 1,\r
    "User", 'Chat + Agent Interactions (Audit Logs)'[Audit_UserId],\r
    "Organization",\r
        LOOKUPVALUE(\r
            'Chat + Agent Org Data'[Organization],\r
            'Chat + Agent Org Data'[PersonId], 'Chat + Agent Interactions (Audit Logs)'[Audit_UserId]\r
        ),\r
    "Priority Score", [@Score],\r
    "Sessions Per Week", [@Sessions],\r
    "Active Days Per Week", [@Days],\r
    "Workloads Per Day", [@Breadth],\r
    "Total", _total\r
)\r
ORDER BY [Rank], [Priority Score] DESC, [Sessions Per Week] DESC, [User]\r
`,l={"[Rank]":{name:`Rank`,displayName:`Rank`,format:`#,0`},"[User]":{name:`User`,displayName:`User`},"[Organization]":{name:`Organization`,displayName:`Organization`},"[Priority Score]":{name:`Priority Score`,displayName:`Priority score`,format:`#,0`},"[Sessions Per Week]":{name:`Sessions Per Week`,displayName:`Sessions per week`,format:`0.0`},"[Active Days Per Week]":{name:`Active Days Per Week`,displayName:`Active days per week`,format:`0.0`},"[Workloads Per Day]":{name:`Workloads Per Day`,displayName:`Workloads per day`,format:`0.0`},...t};function u(){return{connection:`vl`,query:c,columnMetadata:l}}var d=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Copilot Licensed'[Dormancy Bucket Order],\r
            'Copilot Licensed'[Dormancy Bucket],\r
            "@LicensedUsers", [Licensed Seats by Dormancy (Verified)]\r
        ),\r
        NOT ISBLANK('Copilot Licensed'[Dormancy Bucket])\r
            && NOT ISBLANK([@LicensedUsers])\r
    ),\r
    "Dormancy Bucket Order", 'Copilot Licensed'[Dormancy Bucket Order],\r
    "Dormancy Bucket", 'Copilot Licensed'[Dormancy Bucket],\r
    "Licensed Users", [@LicensedUsers]\r
)\r
ORDER BY [Dormancy Bucket Order]\r
`,f={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Dormancy Bucket`,type:`nominal`,title:null,sort:{field:`Dormancy Bucket Order`,order:`ascending`},axis:{labelLimit:220}},x:{field:`Licensed Users`,type:`quantitative`,title:`Licensed users`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}},tooltip:[{field:`Dormancy Bucket`,type:`nominal`,title:`Dormancy bucket`},{field:`Licensed Users`,type:`quantitative`,title:`Licensed users`,format:`,.0f`}]}},p={"[Dormancy Bucket Order]":{name:`Dormancy Bucket Order`,displayName:`Dormancy bucket order`,format:`#,0`},"[Dormancy Bucket]":{name:`Dormancy Bucket`,displayName:`Dormancy bucket`},"[Licensed Users]":{name:`Licensed Users`,displayName:`Licensed users`,format:`#,0`}};function m(){return{connection:`vl`,query:d,columnMetadata:p,vegaLiteSpec:f}}export{i,u as n,s as r,m as t};