import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-CQOZoUwg.js";import{n}from"./theme.context-Bdi5qD2o.js";import{t as r}from"./dist-CNsYZo9O.js";import{D as i,E as a,K as o,N as s,f as c,ft as l,k as ee,l as u,m as d,pt as f,t as p,wt as m}from"./utils-CCoPj5LP.js";import{r as h}from"./report-panels-C7u5leyB.js";import{E as g,T as _,w as v,x as y}from"./task-times.context-BBcn0_iQ.js";import{n as b}from"./source-availability.context-PreDw-5j.js";import{i as x}from"./stage-filter.context-DYufJONF.js";import"./root-gWGWd7kV.js";import{i as S,n as C,o as w,t as T}from"./kpi-card-CepzBQ5w.js";import{t as E}from"./format-kpi-BhveZiQQ.js";import{t as D}from"./section-p8LJFb5N.js";import{t as O}from"./use-filtered-query-Cijb7JFT.js";import{n as te}from"./department-coverage-Cd-kjpTB.js";import{t as k}from"./to-data-table-DHzdyPpP.js";import{t as A}from"./headlined-DjGAlKEw.js";import{i as j}from"./headline-CtXokBCs.js";import{a as ne,n as M,r as re,t as N}from"./heat-CbpN8wu2.js";import{t as P}from"./use-m365-activity-Dw4_HI0j.js";var F=`EVALUATE\r
VAR _people =\r
    CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[WorkloadsActive] > 0)\r
VAR _personDays = CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[WorkloadsActive] > 0)\r
VAR _days = CALCULATE(DISTINCTCOUNT('M365 Activity'[ActivityDate]), REMOVEFILTERS('Chat + Agent Org Data'))\r
VAR _first = CALCULATE(MIN('M365 Activity'[ActivityDate]), REMOVEFILTERS('Chat + Agent Org Data'))\r
VAR _last = CALCULATE(MAX('M365 Activity'[ActivityDate]), REMOVEFILTERS('Chat + Agent Org Data'))\r
VAR _personWeeks = _people * DIVIDE(_days, 7)\r
RETURN\r
ROW(\r
    "People Active", _people,\r
    "Days Loaded", _days,\r
    "First Date", FORMAT(_first, "yyyy-MM-dd"),\r
    "Last Date", FORMAT(_last, "yyyy-MM-dd"),\r
    "Active Days Per Week", DIVIDE(_personDays, _personWeeks),\r
    "Workloads Per Active Day",\r
        CALCULATE(AVERAGE('M365 Activity'[WorkloadsActive]), 'M365 Activity'[WorkloadsActive] > 0),\r
    "Meetings Per Week", DIVIDE(SUM('M365 Activity'[TeamsMeetings]), _personWeeks),\r
    "Call Hours Per Week", DIVIDE(SUM('M365 Activity'[TeamsAudioSeconds]) / 3600, _personWeeks),\r
    "Emails Sent Per Week", DIVIDE(SUM('M365 Activity'[EmailSent]), _personWeeks),\r
    "Chats Per Week",\r
        DIVIDE(\r
            SUM('M365 Activity'[TeamsChatMessages]) + SUM('M365 Activity'[TeamsPrivateChatMessages]),\r
            _personWeeks\r
        )\r
)\r
`,I={"[People Active]":{name:`People Active`,displayName:`People active`,format:`#,0`},"[Days Loaded]":{name:`Days Loaded`,displayName:`Days loaded`,format:`#,0`},"[First Date]":{name:`First Date`,displayName:`First date`},"[Last Date]":{name:`Last Date`,displayName:`Last date`},"[Active Days Per Week]":{name:`Active Days Per Week`,displayName:`Active days per week`,format:`0.0`},"[Workloads Per Active Day]":{name:`Workloads Per Active Day`,displayName:`Workloads per active day`,format:`0.0`},"[Meetings Per Week]":{name:`Meetings Per Week`,displayName:`Meetings per week`,format:`0.0`},"[Call Hours Per Week]":{name:`Call Hours Per Week`,displayName:`Call and meeting hours per week`,format:c},"[Emails Sent Per Week]":{name:`Emails Sent Per Week`,displayName:`Emails sent per week`,format:`0.0`},"[Chats Per Week]":{name:`Chats Per Week`,displayName:`Chat messages per week`,format:`0.0`}};function ie(){return{connection:`vl`,query:F,columnMetadata:I}}var L=/^\d{4}-\d{2}-\d{2}$/;function ae(e){let t=i(e,`[First Date]`),n=i(e,`[Last Date]`),r=a(e,`[Days Loaded]`);if(!t||!n||r===void 0||!L.test(t)||!L.test(n))return;let o=Math.round((Date.parse(`${n}T00:00:00Z`)-Date.parse(`${t}T00:00:00Z`))/864e5)+1;if(o>0)return{firstDate:t,lastDate:n,spanDays:o,daysLoaded:r,missingDays:Math.max(0,o-r)}}var oe=`EVALUATE\r
VAR _weeks =\r
    FILTER(\r
        ADDCOLUMNS(\r
            VALUES('M365 Activity'[WeekStart]),\r
            "@Days", CALCULATE(DISTINCTCOUNT('M365 Activity'[ActivityDate]), REMOVEFILTERS('Chat + Agent Org Data')),\r
            "@People",\r
                CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[WorkloadsActive] > 0)\r
        ),\r
        [@Days] = 7 && [@People] > 0\r
    )\r
VAR _workloads =\r
    DATATABLE(\r
        "Workload", STRING,\r
        "Order", INTEGER,\r
        {\r
            { "Teams", 1 },\r
            { "Email", 2 },\r
            { "SharePoint", 3 },\r
            { "OneDrive", 4 },\r
            { "Office apps", 5 },\r
            { "Viva Engage", 6 }\r
        }\r
    )\r
VAR _long =\r
    GENERATE(\r
        _weeks,\r
        ADDCOLUMNS(\r
            _workloads,\r
            "@Using",\r
                SWITCH(\r
                    [Order],\r
                    1, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[TeamsActive] = 1),\r
                    2, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[EmailActive] = 1),\r
                    3, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[SharePointActive] = 1),\r
                    4, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[OneDriveActive] = 1),\r
                    5, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[AppsActive] = 1),\r
                    6, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[VivaEngageActive] = 1)\r
                )\r
        )\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    FILTER(_long, [@Using] > 0),\r
    "Week Start", 'M365 Activity'[WeekStart],\r
    "Workload", [Workload],\r
    "People", [@Using],\r
    "Share", DIVIDE([@Using], [@People])\r
)\r
ORDER BY [Week Start], [Workload]\r
`,se={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`toDate(datum['Week Start'])`,as:`Week`}],encoding:{x:{field:`Week`,type:`temporal`,title:null,axis:{tickCount:{interval:`week`,step:1},labelExpr:`timeFormat(datum.value, '%-d %b')`,labelAngle:0,labelOverlap:!0}},y:{field:`Share`,type:`quantitative`,title:`Share of active people`,scale:{domain:[0,1],padding:0},axis:{labelExpr:`format(datum.value, '.0%')`}},color:{field:`Workload`,type:`nominal`,title:null,sort:[`Teams`,`Email`,`SharePoint`,`OneDrive`,`Office apps`,`Viva Engage`],legend:{orient:`top`,direction:`horizontal`}}},layer:[{mark:{type:`line`,interpolate:`monotone`,strokeWidth:2}},{mark:{type:`point`,filled:!0,size:40},encoding:{tooltip:[{field:`Week`,type:`temporal`,title:`Week starting`,format:`%d %b %Y`},{field:`Workload`,type:`nominal`,title:`Workload`},{field:`Share`,type:`quantitative`,title:`Share of active people`,format:`.1%`},{field:`People`,type:`quantitative`,title:`People`,format:`,.0f`}]}}]},ce={"[Week Start]":{name:`Week Start`,displayName:`Week starting`,format:`dd mmm yyyy`},"[Workload]":{name:`Workload`,displayName:`Workload`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Share]":{name:`Share`,displayName:`Share of active people`,format:d}};function le(){return{connection:`vl`,query:oe,columnMetadata:ce,vegaLiteSpec:se}}var ue=`EVALUATE\r
VAR _people =\r
    CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[WorkloadsActive] > 0)\r
VAR _weeks = DIVIDE(CALCULATE(DISTINCTCOUNT('M365 Activity'[ActivityDate]), REMOVEFILTERS('Chat + Agent Org Data')), 7)\r
VAR _workloads =\r
    DATATABLE(\r
        "Workload", STRING,\r
        "Order", INTEGER,\r
        {\r
            { "Teams", 1 },\r
            { "Email", 2 },\r
            { "SharePoint", 3 },\r
            { "OneDrive", 4 },\r
            { "Office apps", 5 },\r
            { "Viva Engage", 6 }\r
        }\r
    )\r
VAR _measured =\r
    ADDCOLUMNS(\r
        _workloads,\r
        "@People",\r
            SWITCH(\r
                [Order],\r
                1, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[TeamsActive] = 1),\r
                2, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[EmailActive] = 1),\r
                3, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[SharePointActive] = 1),\r
                4, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[OneDriveActive] = 1),\r
                5, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[AppsActive] = 1),\r
                6, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[VivaEngageActive] = 1)\r
            ),\r
        "@PersonDays",\r
            SWITCH(\r
                [Order],\r
                1, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[TeamsActive] = 1),\r
                2, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[EmailActive] = 1),\r
                3, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[SharePointActive] = 1),\r
                4, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[OneDriveActive] = 1),\r
                5, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[AppsActive] = 1),\r
                6, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[VivaEngageActive] = 1)\r
            )\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    FILTER(_measured, [@People] > 0),\r
    "Workload", [Workload],\r
    "People", [@People],\r
    "Reach", DIVIDE([@People], _people),\r
    "Days Per Week", DIVIDE([@PersonDays], [@People] * _weeks)\r
)\r
ORDER BY [Reach] DESC, [Workload]\r
`,de={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Workload`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:200}},x:{field:`Reach`,type:`quantitative`,title:`Share of active people`,scale:{domain:[0,1]},axis:{labelExpr:`format(datum.value, '.0%')`}},tooltip:[{field:`Workload`,type:`nominal`,title:`Workload`},{field:`Reach`,type:`quantitative`,title:`Share of active people`,format:`.1%`},{field:`People`,type:`quantitative`,title:`People`,format:`,.0f`},{field:`Days Per Week`,type:`quantitative`,title:`Days per week, when used`,format:`,.1f`}]}},fe={"[Workload]":{name:`Workload`,displayName:`Workload`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Reach]":{name:`Reach`,displayName:`Share of active people`,format:d},"[Days Per Week]":{name:`Days Per Week`,displayName:`Days per week, when used`,format:`0.0`}};function pe(){return{connection:`vl`,query:ue,columnMetadata:fe,vegaLiteSpec:de}}var me=`EVALUATE\r
VAR _people =\r
    CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[WorkloadsActive] > 0)\r
VAR _apps =\r
    DATATABLE(\r
        "App", STRING,\r
        "Order", INTEGER,\r
        {\r
            { "Outlook", 1 },\r
            { "Teams", 2 },\r
            { "Word", 3 },\r
            { "Excel", 4 },\r
            { "PowerPoint", 5 },\r
            { "OneNote", 6 }\r
        }\r
    )\r
VAR _measured =\r
    ADDCOLUMNS(\r
        _apps,\r
        "@People",\r
            SWITCH(\r
                [Order],\r
                1, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[AppOutlook] = 1),\r
                2, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[AppTeams] = 1),\r
                3, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[AppWord] = 1),\r
                4, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[AppExcel] = 1),\r
                5, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[AppPowerPoint] = 1),\r
                6, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[AppOneNote] = 1)\r
            )\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    FILTER(_measured, [@People] > 0),\r
    "App", [App],\r
    "People", [@People],\r
    "Reach", DIVIDE([@People], _people)\r
)\r
ORDER BY [Reach] DESC, [App]\r
`,he={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`App`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:200}},x:{field:`Reach`,type:`quantitative`,title:`Share of active people`,scale:{domain:[0,1]},axis:{labelExpr:`format(datum.value, '.0%')`}},tooltip:[{field:`App`,type:`nominal`,title:`App`},{field:`Reach`,type:`quantitative`,title:`Share of active people`,format:`.1%`},{field:`People`,type:`quantitative`,title:`People`,format:`,.0f`}]}},ge={"[App]":{name:`App`,displayName:`App`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Reach]":{name:`Reach`,displayName:`Share of active people`,format:d}};function _e(){return{connection:`vl`,query:me,columnMetadata:ge,vegaLiteSpec:he}}var ve=`EVALUATE\r
VAR _people =\r
    ADDCOLUMNS(\r
        CALCULATETABLE(VALUES('M365 Activity'[UPN_Normalized]), 'M365 Activity'[WorkloadsActive] > 0),\r
        "@Apps",\r
            CALCULATE(\r
                MAX('M365 Activity'[AppOutlook])\r
                    + MAX('M365 Activity'[AppTeams])\r
                    + MAX('M365 Activity'[AppWord])\r
                    + MAX('M365 Activity'[AppExcel])\r
                    + MAX('M365 Activity'[AppPowerPoint])\r
                    + MAX('M365 Activity'[AppOneNote])\r
            )\r
    )\r
VAR _total = COUNTROWS(_people)\r
VAR _buckets =\r
    DATATABLE(\r
        "Apps", INTEGER,\r
        "Apps Used", STRING,\r
        {\r
            { 0, "No app use reported" },\r
            { 1, "1 app" },\r
            { 2, "2 apps" },\r
            { 3, "3 apps" },\r
            { 4, "4 apps" },\r
            { 5, "5 apps" },\r
            { 6, "All 6 apps" }\r
        }\r
    )\r
VAR _measured =\r
    ADDCOLUMNS(\r
        FILTER(_buckets, _total > 0),\r
        "@People",\r
            VAR _apps = [Apps]\r
            RETURN COALESCE(COUNTROWS(FILTER(_people, [@Apps] = _apps)), 0)\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    _measured,\r
    "Apps Used", [Apps Used],\r
    "Apps", [Apps],\r
    "People", [@People],\r
    "Share", DIVIDE([@People], _total)\r
)\r
ORDER BY [Apps]\r
`,ye={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`datum['Apps'] === 0 ? 7 : datum['Apps']`,as:`Order`}],mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Apps Used`,type:`nominal`,title:null,sort:{field:`Order`,op:`min`,order:`ascending`},axis:{labelLimit:200}},x:{field:`Share`,type:`quantitative`,title:`Share of active people`,scale:{domain:[0,1]},axis:{labelExpr:`format(datum.value, '.0%')`}},opacity:{condition:{test:`datum['Apps'] === 0`,value:.4},value:1},tooltip:[{field:`Apps Used`,type:`nominal`,title:`Apps used`},{field:`Share`,type:`quantitative`,title:`Share of active people`,format:`.1%`},{field:`People`,type:`quantitative`,title:`People`,format:`,.0f`}]}},be={"[Apps Used]":{name:`Apps Used`,displayName:`Apps used`},"[Apps]":{name:`Apps`,displayName:`Apps`,format:`#,0`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Share]":{name:`Share`,displayName:`Share of active people`,format:d}};function xe(){return{connection:`vl`,query:ve,columnMetadata:be,vegaLiteSpec:ye}}var Se=`EVALUATE\r
VAR _people =\r
    CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[WorkloadsActive] > 0)\r
VAR _weeks = DIVIDE(CALCULATE(DISTINCTCOUNT('M365 Activity'[ActivityDate]), REMOVEFILTERS('Chat + Agent Org Data')), 7)\r
VAR _platforms =\r
    DATATABLE(\r
        "Platform", STRING,\r
        "Order", INTEGER,\r
        {\r
            { "Windows", 1 },\r
            { "Mac", 2 },\r
            { "Web", 3 },\r
            { "Mobile", 4 }\r
        }\r
    )\r
VAR _measured =\r
    ADDCOLUMNS(\r
        _platforms,\r
        "@People",\r
            SWITCH(\r
                [Order],\r
                1, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[PlatformWindows] = 1),\r
                2, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[PlatformMac] = 1),\r
                3, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[PlatformWeb] = 1),\r
                4, CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[PlatformMobile] = 1)\r
            ),\r
        "@PersonDays",\r
            SWITCH(\r
                [Order],\r
                1, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[PlatformWindows] = 1),\r
                2, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[PlatformMac] = 1),\r
                3, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[PlatformWeb] = 1),\r
                4, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[PlatformMobile] = 1)\r
            )\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    FILTER(_measured, [@People] > 0),\r
    "Platform", [Platform],\r
    "People", [@People],\r
    "Reach", DIVIDE([@People], _people),\r
    "Days Per Week", DIVIDE([@PersonDays], [@People] * _weeks)\r
)\r
ORDER BY [Reach] DESC, [Platform]\r
`,Ce={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Platform`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:200}},x:{field:`Reach`,type:`quantitative`,title:`Share of active people`,scale:{domain:[0,1]},axis:{labelExpr:`format(datum.value, '.0%')`}},tooltip:[{field:`Platform`,type:`nominal`,title:`Platform`},{field:`Reach`,type:`quantitative`,title:`Share of active people`,format:`.1%`},{field:`People`,type:`quantitative`,title:`People`,format:`,.0f`},{field:`Days Per Week`,type:`quantitative`,title:`Days per week, when used`,format:`,.1f`}]}},we={"[Platform]":{name:`Platform`,displayName:`Platform`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Reach]":{name:`Reach`,displayName:`Share of active people`,format:d},"[Days Per Week]":{name:`Days Per Week`,displayName:`Days per week, when used`,format:`0.0`}};function Te(){return{connection:`vl`,query:Se,columnMetadata:we,vegaLiteSpec:Ce}}var Ee=`EVALUATE\r
VAR _m365 =\r
    CALCULATETABLE(VALUES('M365 Activity'[UPN_Normalized]), 'M365 Activity'[WorkloadsActive] > 0)\r
VAR _copilot =\r
    FILTER(\r
        VALUES('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
        'Chat + Agent Interactions (Audit Logs)'[Audit_UserId] <> ""\r
    )\r
VAR _licensed =\r
    CALCULATETABLE(\r
        VALUES('Copilot Licensed'[UPN_Normalized]),\r
        FILTER(\r
            ALL('Copilot Licensed'[Has license]),\r
            UPPER(TRIM('Copilot Licensed'[Has license])) IN { "YES", "TRUE", "Y", "1" }\r
        )\r
    )\r
VAR _people = COUNTROWS(_m365)\r
VAR _using = COUNTROWS(INTERSECT(_m365, _copilot))\r
VAR _licensedPeople = INTERSECT(_m365, _licensed)\r
VAR _licensedIdle = COUNTROWS(EXCEPT(_licensedPeople, _copilot))\r
RETURN\r
ROW(\r
    "M365 People", _people,\r
    "Copilot People", COALESCE(_using, 0),\r
    "Copilot Reach", DIVIDE(COALESCE(_using, 0), _people),\r
    "Not Using", COUNTROWS(EXCEPT(_m365, _copilot)),\r
    "Licensed People", COUNTROWS(_licensedPeople),\r
    "Licensed Not Using", COALESCE(_licensedIdle, 0),\r
    "Licensed Idle Share", DIVIDE(COALESCE(_licensedIdle, 0), COUNTROWS(_licensedPeople))\r
)\r
`,De={"[M365 People]":{name:`M365 People`,displayName:`People active on Microsoft 365`,format:`#,0`},"[Copilot People]":{name:`Copilot People`,displayName:`Also using Copilot or agents`,format:`#,0`},"[Copilot Reach]":{name:`Copilot Reach`,displayName:`Copilot reach`,format:d},"[Not Using]":{name:`Not Using`,displayName:`Not using Copilot yet`,format:`#,0`},"[Licensed People]":{name:`Licensed People`,displayName:`Licensed`,format:`#,0`},"[Licensed Not Using]":{name:`Licensed Not Using`,displayName:`Licensed, not using`,format:`#,0`},"[Licensed Idle Share]":{name:`Licensed Idle Share`,displayName:`Licensed, not using`,format:d}};function Oe(){return{connection:`vl`,query:Ee,columnMetadata:De}}var ke=`EVALUATE\r
VAR _m365 =\r
    CALCULATETABLE(VALUES('M365 Activity'[UPN_Normalized]), 'M365 Activity'[WorkloadsActive] > 0)\r
VAR _copilot =\r
    FILTER(\r
        VALUES('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
        'Chat + Agent Interactions (Audit Logs)'[Audit_UserId] <> ""\r
    )\r
VAR _using = INTERSECT(_m365, _copilot)\r
VAR _rest = EXCEPT(_m365, _copilot)\r
VAR _weeks = DIVIDE(CALCULATE(DISTINCTCOUNT('M365 Activity'[ActivityDate]), REMOVEFILTERS('Chat + Agent Org Data')), 7)\r
VAR _usingWeeks = COUNTROWS(_using) * _weeks\r
VAR _restWeeks = COUNTROWS(_rest) * _weeks\r
VAR _metrics =\r
    DATATABLE(\r
        "Metric", STRING,\r
        "Order", INTEGER,\r
        {\r
            { "Active days", 1 },\r
            { "Meetings", 2 },\r
            { "Call and meeting hours", 3 },\r
            { "Emails sent", 4 },\r
            { "Chat messages", 5 },\r
            { "Files viewed or edited", 6 }\r
        }\r
    )\r
VAR _measured =\r
    ADDCOLUMNS(\r
        _metrics,\r
        "@Using",\r
            VAR _order = [Order]\r
            RETURN\r
                DIVIDE(\r
                    CALCULATE(\r
                        SWITCH(\r
                            _order,\r
                            1, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[WorkloadsActive] > 0),\r
                            2, SUM('M365 Activity'[TeamsMeetings]),\r
                            3, SUM('M365 Activity'[TeamsAudioSeconds]) / 3600,\r
                            4, SUM('M365 Activity'[EmailSent]),\r
                            5, SUM('M365 Activity'[TeamsChatMessages]) + SUM('M365 Activity'[TeamsPrivateChatMessages]),\r
                            6, SUM('M365 Activity'[SharePointFilesViewedOrEdited]) + SUM('M365 Activity'[OneDriveFilesViewedOrEdited])\r
                        ),\r
                        TREATAS(_using, 'M365 Activity'[UPN_Normalized])\r
                    ),\r
                    _usingWeeks\r
                ),\r
        "@Rest",\r
            VAR _order = [Order]\r
            RETURN\r
                DIVIDE(\r
                    CALCULATE(\r
                        SWITCH(\r
                            _order,\r
                            1, CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[WorkloadsActive] > 0),\r
                            2, SUM('M365 Activity'[TeamsMeetings]),\r
                            3, SUM('M365 Activity'[TeamsAudioSeconds]) / 3600,\r
                            4, SUM('M365 Activity'[EmailSent]),\r
                            5, SUM('M365 Activity'[TeamsChatMessages]) + SUM('M365 Activity'[TeamsPrivateChatMessages]),\r
                            6, SUM('M365 Activity'[SharePointFilesViewedOrEdited]) + SUM('M365 Activity'[OneDriveFilesViewedOrEdited])\r
                        ),\r
                        TREATAS(_rest, 'M365 Activity'[UPN_Normalized])\r
                    ),\r
                    _restWeeks\r
                )\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    FILTER(_measured, [@Using] > 0 && [@Rest] > 0),\r
    "Metric", [Metric],\r
    "Copilot Users", [@Using],\r
    "Others", [@Rest],\r
    "Index", DIVIDE([@Using], [@Rest])\r
)\r
ORDER BY [Index] DESC, [Metric]\r
`,Ae={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{calculate:`datum['Index'] >= 1 ? 'More' : 'Less'`,as:`Direction`}],layer:[{mark:{type:`bar`},encoding:{y:{field:`Metric`,type:`nominal`,title:null,sort:{field:`Index`,order:`descending`},axis:{labelLimit:200}},x:{field:`Index`,type:`quantitative`,title:`Copilot users compared with everyone else (1× = the same)`,scale:{zero:!0},axis:{labelExpr:`format(datum.value, '.1f') + '×'`}},x2:{datum:1},color:{field:`Direction`,type:`nominal`,title:null,sort:[`More`,`Less`],legend:null},tooltip:[{field:`Metric`,type:`nominal`,title:`Per person, per week`},{field:`Copilot Users`,type:`quantitative`,title:`Copilot users`,format:`,.1f`},{field:`Others`,type:`quantitative`,title:`Everyone else`,format:`,.1f`},{field:`Index`,type:`quantitative`,title:`Ratio`,format:`.2f`}]}},{mark:{type:`rule`,strokeDash:[4,3]},encoding:{x:{datum:1}}}]},je={"[Metric]":{name:`Metric`,displayName:`Per person, per week`},"[Copilot Users]":{name:`Copilot Users`,displayName:`Copilot users`,format:`0.0`},"[Others]":{name:`Others`,displayName:`Everyone else`,format:`0.0`},"[Index]":{name:`Index`,displayName:`Ratio`,format:`0.0`}};function Me(){return{connection:`vl`,query:ke,columnMetadata:je,vegaLiteSpec:Ae}}var Ne=`EVALUATE\r
VAR _minPeople = 5\r
VAR _copilot =\r
    FILTER(\r
        VALUES('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
        'Chat + Agent Interactions (Audit Logs)'[Audit_UserId] <> ""\r
    )\r
VAR _weeks = DIVIDE(CALCULATE(DISTINCTCOUNT('M365 Activity'[ActivityDate]), REMOVEFILTERS('Chat + Agent Org Data')), 7)\r
VAR _orgs =\r
    FILTER(\r
        ADDCOLUMNS(\r
            FILTER(\r
                VALUES('Chat + Agent Org Data'[Organization]),\r
                NOT ISBLANK('Chat + Agent Org Data'[Organization])\r
            ),\r
            "@People",\r
                CALCULATE(DISTINCTCOUNT('M365 Activity'[UPN_Normalized]), 'M365 Activity'[WorkloadsActive] > 0)\r
        ),\r
        [@People] > 0\r
    )\r
VAR _small = SELECTCOLUMNS(FILTER(_orgs, [@People] < _minPeople), "@Name", 'Chat + Agent Org Data'[Organization])\r
VAR _pooled = COALESCE(COUNTROWS(_small), 0)\r
VAR _groups =\r
    UNION(\r
        SELECTCOLUMNS(\r
            FILTER(_orgs, [@People] >= _minPeople),\r
            "@Org", 'Chat + Agent Org Data'[Organization],\r
            "@Pooled", 0\r
        ),\r
        FILTER(ROW("@Org", "Smaller groups", "@Pooled", _pooled), _pooled > 0)\r
    )\r
VAR _measured =\r
    GENERATE(\r
        _groups,\r
        VAR _org = [@Org]\r
        VAR _isPool = [@Pooled] > 0\r
        VAR _members =\r
            FILTER(\r
                VALUES('Chat + Agent Org Data'[Organization]),\r
                IF(\r
                    _isPool,\r
                    'Chat + Agent Org Data'[Organization] IN _small,\r
                    'Chat + Agent Org Data'[Organization] = _org\r
                )\r
            )\r
        VAR _people =\r
            CALCULATETABLE(VALUES('M365 Activity'[UPN_Normalized]), 'M365 Activity'[WorkloadsActive] > 0, _members)\r
        RETURN\r
            ROW(\r
                "@People", COUNTROWS(_people),\r
                "@Copilot", COUNTROWS(INTERSECT(_people, _copilot)),\r
                "@PersonDays", CALCULATE(COUNTROWS('M365 Activity'), 'M365 Activity'[WorkloadsActive] > 0, _members),\r
                "@Meetings", CALCULATE(SUM('M365 Activity'[TeamsMeetings]), _members),\r
                "@Emails", CALCULATE(SUM('M365 Activity'[EmailSent]), _members)\r
            )\r
    )\r
RETURN\r
SELECTCOLUMNS(\r
    _measured,\r
    "Organization", [@Org],\r
    "Pooled Groups", [@Pooled],\r
    "People Active", [@People],\r
    "Copilot Users", COALESCE([@Copilot], 0),\r
    "Copilot Reach", DIVIDE(COALESCE([@Copilot], 0), [@People]),\r
    "Active Days Per Week", DIVIDE([@PersonDays], [@People] * _weeks),\r
    "Meetings Per Week", DIVIDE([@Meetings], [@People] * _weeks),\r
    "Emails Sent Per Week", DIVIDE([@Emails], [@People] * _weeks)\r
)\r
ORDER BY [Pooled Groups], [People Active] DESC, [Organization]\r
`,Pe={"[Organization]":{name:`Organization`,displayName:`Organization`},"[Pooled Groups]":{name:`Pooled Groups`,displayName:`Groups pooled`,format:`#,0`},"[People Active]":{name:`People Active`,displayName:`People active`,format:`#,0`},"[Copilot Users]":{name:`Copilot Users`,displayName:`Using Copilot`,format:`#,0`},"[Copilot Reach]":{name:`Copilot Reach`,displayName:`Copilot reach`,format:d},"[Active Days Per Week]":{name:`Active Days Per Week`,displayName:`Active days per week`,format:`0.0`},"[Meetings Per Week]":{name:`Meetings Per Week`,displayName:`Meetings per week`,format:`0.0`},"[Emails Sent Per Week]":{name:`Emails Sent Per Week`,displayName:`Emails sent per week`,format:`0.0`}};function Fe(){return{connection:`vl`,query:Ne,columnMetadata:Pe}}var R=`Microsoft 365 activity`,z=`How people spend a working week across Teams, Outlook, SharePoint, OneDrive, Viva Engage and the Office apps.`,Ie=`In the Microsoft 365 admin center, go to Settings > Org settings > Reports, untick "Display concealed user, group, and site names in all reports", then run the pipeline again.`,Le=`The report returned no app usage for this period`;function Re(e,t){return t?{title:Le,description:`People were active on Teams, email, SharePoint or OneDrive, but Microsoft's Microsoft 365 apps report (getM365AppUserDetail) had no ${e===`apps`?`app`:`platform`} marked for anyone. The per-report row counts are in the m365_report_status table; to compare, open Reports > Usage > Microsoft 365 Apps in the Microsoft 365 admin center.`}:e===`apps`?{title:`No app activity`,description:`Nobody in the current selection opened a Microsoft 365 app.`}:{title:`No platform reported`,description:`The apps report had no platform for anyone in the current selection.`}}var B=e(t(),1);function V(e,t){return e.columns.findIndex(e=>e.name===t)}function H(e){return typeof e==`number`&&Number.isFinite(e)?e:void 0}function ze(e,t,n){let r=V(e,n),i=V(e,`People`),a=V(e,e.columns.some(e=>e.name===`Reach`)?`Reach`:`Share`);return r<0||i<0||a<0?[]:t.flatMap(e=>{let t=e[r],n=H(e[i]),o=H(e[a]);return typeof t!=`string`||t===``||n===void 0||o===void 0||n<=0||o<=0||o>1?[]:[{name:t,people:n,reach:o}]})}function Be(e){if(e.length<2)return;let t=Math.max(...e.map(e=>e.people/e.reach));if(Math.round(t)<5)return;let n=[...e].sort((e,t)=>t.reach-e.reach),r=j(n[0].reach,1);if(r!==j(n[1].reach,1))return{top:n[0],share:r}}function U(e){return t=>{let n=Be(ze(t,t.rows,e));return n&&`${n.top.name} reaches the most people, at ${n.share} of those active.`}}var Ve=U(`Workload`),He=U(`App`),Ue=U(`Platform`);function We(e){return typeof e==`string`&&/^\d{4}-\d{2}-\d{2}/.test(e)?e.slice(0,10):void 0}var Ge=e=>{let t=V(e,`Week Start`);if(t<0)return;let n=e.rows.map(e=>We(e[t])).filter(e=>e!==void 0);if(n.length===0)return;let r=n.reduce((e,t)=>t>e?t:e),i=Be(ze(e,e.rows.filter(e=>We(e[t])===r),`Workload`));if(i)return`In the week of ${new Date(`${r}T00:00:00Z`).toLocaleDateString(`en-GB`,{day:`numeric`,month:`short`,year:`numeric`,timeZone:`UTC`})}, ${i.top.name} reached the most people, at ${i.share} of those active.`},W=6,Ke=e=>{let t=V(e,`Apps`),n=V(e,`People`);if(t<0||n<0)return;let r=e.rows.flatMap(e=>{let r=H(e[t]),i=H(e[n]);return r===void 0||i===void 0||i<=0||r<0||r>W?[]:[{apps:r,people:i}]});if(r.length<2)return;let i=r.reduce((e,t)=>e+t.people,0);if(i<5)return;let a=e=>r.filter(t=>t.apps>=e).reduce((e,t)=>e+t.people,0),o=W;for(;o>1&&a(o)/i<.5;)--o;let s=j(a(o),i);return o===W?`${s} of active people opened all six apps.`:o===1?`${s} of active people opened at least one of the six apps.`:`${s} of active people opened ${o} or more of the six apps.`},G=new Intl.NumberFormat(`en-GB`,{minimumFractionDigits:1,maximumFractionDigits:1});function qe(e,t){return n=>{if(e===void 0||t===void 0||e<5||t<5)return;let r=V(n,`Metric`),i=V(n,`Index`);if(r<0||i<0)return;let a=n.rows.flatMap(e=>{let t=e[r],n=H(e[i]);return typeof t!=`string`||t===``||n===void 0||n<=0?[]:[{metric:t,index:n,gap:Math.abs(Math.log(n))}]});if(a.length<2)return;a.sort((e,t)=>t.gap-e.gap);let[o,s]=a,c=G.format(o.index);if(c!==G.format(1)&&!(Math.abs(o.gap-s.gap)<1e-9||c===G.format(s.index)))return`${o.metric} show the widest gap: Copilot users average ${c}× as many as everyone else. A comparison, not a cause.`}}var K=m(),Je=ie(),q=le(),J=pe(),Ye={perRow:40,chrome:100},Xe=[{term:`People active`,text:`Anyone who used at least one workload: Teams, Outlook, SharePoint, OneDrive, Viva Engage or the Office apps. Receiving email alone doesn't count.`},{term:`Per week`,text:`Each figure is per active person, spread over the weeks that have data. Days with nothing loaded are left out, so a gap doesn't read as a quiet week.`},{term:`Week by week`,text:`Only full Monday-to-Sunday weeks are plotted, so a part week at either end doesn't pull the line down.`},{term:`Source`,text:`The Microsoft 365 usage reports, one row per person per day. They run two to three days behind, and recent days are read again as they fill in.`}];function Ze(e){return`${E(e,`whole`)} ${e===1?`day`:`days`}`}function Qe({firstDate:e,lastDate:t,daysLoaded:n,missingDays:r}){return`${`Per person, over ${o(e,t)}`}${r>0?`: ${Ze(n)} with data. ${Ze(r)} in that span ${r===1?`has`:`have`} none, and ${r===1?`is`:`are`} left out of the averages rather than counted as quiet.`:`.`} The usage reports run two to three days behind, so the latest days fill in later.`}function $e({concealed:e}){let{theme:t}=n(),r=O(Je),i=O(q),o=O(J),s=(0,B.useMemo)(()=>r.data?.status===`success`?ee(r.data.table):void 0,[r.data]),c=(0,B.useMemo)(()=>i.data?.status===`success`?k(i.data.table,q.columnMetadata):void 0,[i.data]),l=(0,B.useMemo)(()=>o.data?.status===`success`?k(o.data.table,J.columnMetadata):void 0,[o.data]),d=a(s,`[People Active]`),f=ae(s),m=(0,B.useMemo)(()=>c?Ge(c):void 0,[c]),y=(0,B.useMemo)(()=>l?Ve(l):void 0,[l]),b=l?.rows.length?w(l.rows.length,Ye)+(y?40:0):void 0;return(0,K.jsxs)(D,{id:u(`m365-activity`),title:R,description:z,children:[e&&(0,K.jsxs)(`p`,{role:`status`,className:p(`text-[length:var(--text-200)] leading-200`,`max-w-[90ch] rounded-md bg-secondary px-300 py-200 text-foreground`),children:[`Microsoft 365 hides user names in its usage reports, so this activity can't be matched to people. The figures on this page are right, but filtering by organization and comparing with Copilot use won't work. `,`In the Microsoft 365 admin center, go to Settings > Org settings > Reports, untick "Display concealed user, group, and site names in all reports", then run the pipeline again.`]}),r.data?.status===`error`?(0,K.jsx)(_,{message:r.data.error.message,onRetry:r.refetch}):r.isLoading||!r.data?(0,K.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,children:[(0,K.jsx)(g,{}),(0,K.jsx)(g,{}),(0,K.jsx)(g,{}),(0,K.jsx)(g,{})]}):d?(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,children:[(0,K.jsx)(T,{label:`People active`,value:d,emphasis:!0,detail:(0,K.jsx)(C,{label:`Workloads per active day`,value:a(s,`[Workloads Per Active Day]`),format:`rate`})}),(0,K.jsx)(T,{label:`Active days per week`,value:a(s,`[Active Days Per Week]`),format:`rate`,detail:`per person, on any Microsoft 365 workload`}),(0,K.jsx)(T,{label:`Meetings per week`,value:a(s,`[Meetings Per Week]`),format:`rate`,detail:(0,K.jsx)(C,{label:`Hours on calls and meetings`,value:a(s,`[Call Hours Per Week]`),format:`hours`})}),(0,K.jsx)(T,{label:`Emails sent per week`,value:a(s,`[Emails Sent Per Week]`),format:`rate`,detail:(0,K.jsx)(C,{label:`Teams chat messages`,value:a(s,`[Chats Per Week]`),format:`rate`})})]}),f&&(0,K.jsx)(`p`,{className:p(`text-[length:var(--text-200)] leading-200`,`max-w-[80ch] text-muted-foreground`),children:Qe(f)})]}):(0,K.jsx)(v,{title:`Nobody active on Microsoft 365`,description:`No one in the current selection has Microsoft 365 activity. Widen the dates or clear the organization filter.`}),(0,K.jsx)(`div`,{style:{height:360+(m?40:0)},children:i.data?.status===`error`?(0,K.jsx)(_,{className:`h-full`,message:i.data.error.message,onRetry:i.refetch}):i.isLoading||!c?(0,K.jsx)(g,{className:`h-full`}):c.rows.length===0?(0,K.jsx)(v,{className:`h-full`,title:`No complete weeks yet`,description:`The trend only plots full Monday-to-Sunday weeks, and the selection doesn't cover one.`}):(0,K.jsx)(A,{text:m,children:(0,K.jsx)(S,{label:`Which workloads people use, week by week`,spec:q.vegaLiteSpec,data:c,theme:t,header:{title:`Which workloads people use, week by week`,subtitle:`Share of the people active on Microsoft 365 that week who used each workload.`}})})}),(0,K.jsxs)(`div`,{className:`grid gap-400 xl:grid-cols-2`,children:[(0,K.jsx)(`div`,{className:`h-[340px]`,style:b?{height:b}:void 0,children:o.data?.status===`error`?(0,K.jsx)(_,{className:`h-full`,message:o.data.error.message,onRetry:o.refetch}):o.isLoading||!l?(0,K.jsx)(g,{className:`h-full`}):l.rows.length===0?(0,K.jsx)(v,{className:`h-full`,title:`No workload activity`,description:`Nobody in the current selection used a Microsoft 365 workload.`}):(0,K.jsx)(A,{text:y,children:(0,K.jsx)(S,{label:`How far each workload reaches`,spec:J.vegaLiteSpec,data:l,theme:t,header:{title:`How far each workload reaches`,subtitle:`Share of active people, with days per week in the tooltip.`}})})}),(0,K.jsx)(`div`,{className:`xl:self-start`,children:(0,K.jsx)(h,{title:`How these figures are worked out`,notes:Xe})})]})]})}var et=Oe(),Y=Me(),tt=`Copilot in the flow of work`,nt=`How far Copilot reaches into the Microsoft 365 workforce, and how a Copilot user's week differs.`;function rt(e){return e.charAt(0).toUpperCase()+e.slice(1)}function it(e){return[{term:`Copilot users`,text:`Anyone with Copilot Chat or agent activity in the audit log during the selection. Everyone else active on Microsoft 365 is the comparison group.`},{term:`Licensed`,text:`People marked as holding a Copilot license in the license list.`},{term:`The comparison`,text:`Sets the two groups' weeks side by side. It shows the gap, not that Copilot caused it: people who take up Copilot early may already work differently.`},{term:`Small groups`,text:`${rt(e.plural)} with fewer than 5 active people share one row, so no row describes a handful of people who could be picked out.`}]}function at(e){let t=e[`Pooled Groups`];return typeof t==`number`&&t>0?t:0}function ot(e,t){return[{id:`Organization`,header:e.label,minWidth:200,cellRenderer:(t,n)=>{let r=at(n);return r===0?t:(0,K.jsxs)(`span`,{className:`text-muted-foreground`,children:[E(r,`whole`),` smaller `,r===1?e.noun:e.plural]})}},{id:`Pooled Groups`,header:`Groups pooled`,hidden:!0},{id:`People Active`,header:`People active`,width:124,numericStyling:!0},{id:`Copilot Users`,header:`Using Copilot`,width:128,numericStyling:!0},{id:`Copilot Reach`,header:`Copilot reach`,width:124,numericStyling:!0,cellRenderer:ne({domain:M(t,`Copilot Reach`),format:N(t,`Copilot Reach`)})},{id:`Active Days Per Week`,header:`Active days`,width:116,numericStyling:!0},{id:`Meetings Per Week`,header:`Meetings`,width:104,numericStyling:!0},{id:`Emails Sent Per Week`,header:`Emails sent`,width:112,numericStyling:!0}]}function st({concealed:e}){return e?(0,K.jsx)(D,{id:u(`m365-copilot`),title:tt,description:nt,children:(0,K.jsx)(v,{title:`Can't match Microsoft 365 activity to Copilot use`,description:`The usage reports hide user names, so nobody here can be matched to their Copilot use. ${Ie}`})}):(0,K.jsx)(ct,{})}function ct(){let{theme:e}=n(),t=s(),i=O(et),o=O(Y),c=(0,B.useMemo)(()=>f(Fe(),t),[t]),d=O({connection:c.connection,query:c.query,columnMetadata:c.columnMetadata}),p=(0,B.useMemo)(()=>i.data?.status===`success`?ee(i.data.table):void 0,[i.data]),m=(0,B.useMemo)(()=>o.data?.status===`success`?k(o.data.table,Y.columnMetadata):void 0,[o.data]),y=(0,B.useMemo)(()=>d.data?.status===`success`?k(d.data.table,c.columnMetadata):void 0,[d.data,c.columnMetadata]),b=(0,B.useMemo)(()=>ot(t,y),[t,y]),x=(0,B.useMemo)(()=>re(y,`Pooled Groups`).map(e=>typeof e==`number`&&e>0?e:0),[y]),j=x.reduce((e,t)=>e+Math.max(1,t),0),ne=x.some(e=>e>0),M=a(p,`[M365 People]`),N=a(p,`[Licensed People]`),P=a(p,`[Copilot People]`),F=M!==void 0&&P!==void 0?M-P:void 0,I=(0,B.useMemo)(()=>m?qe(P,F)(m):void 0,[m,P,F]);return(0,K.jsxs)(D,{id:u(`m365-copilot`),title:tt,description:nt,children:[i.data?.status===`error`?(0,K.jsx)(_,{message:i.data.error.message,onRetry:i.refetch}):i.isLoading||!i.data?(0,K.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-3`,children:[(0,K.jsx)(g,{}),(0,K.jsx)(g,{}),(0,K.jsx)(g,{})]}):M?(0,K.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-3`,children:[(0,K.jsx)(T,{label:`Copilot reach`,value:a(p,`[Copilot Reach]`),format:`percent`,emphasis:!0,detail:`${E(a(p,`[Copilot People]`)??0,`whole`)} of ${E(M,`whole`)} people active on Microsoft 365 also used Copilot or an agent`}),(0,K.jsx)(T,{label:`Not using Copilot yet`,value:a(p,`[Not Using]`),detail:`worked on Microsoft 365 in this selection without touching Copilot Chat or an agent`}),(0,K.jsx)(T,{label:`Licensed, not using`,value:a(p,`[Licensed Not Using]`),detail:N?(0,K.jsx)(C,{label:`Of ${E(N,`whole`)} licensed people at work`,value:a(p,`[Licensed Idle Share]`),format:`percent`}):`No licensed people were active on Microsoft 365 in this selection`})]}):(0,K.jsx)(v,{title:`Nobody active on Microsoft 365`,description:`No one in the current selection has Microsoft 365 activity to compare with Copilot use.`}),(0,K.jsxs)(`div`,{className:`grid gap-400 2xl:grid-cols-3`,children:[(0,K.jsx)(`div`,{className:`h-[340px] 2xl:col-span-2`,style:m?.rows.length?{height:w(m.rows.length,{perRow:44,chrome:116})+(I?40:0)}:void 0,children:o.data?.status===`error`?(0,K.jsx)(_,{className:`h-full`,message:o.data.error.message,onRetry:o.refetch}):o.isLoading||!m?(0,K.jsx)(g,{className:`h-full`}):m.rows.length===0?(0,K.jsx)(v,{className:`h-full`,title:`Nothing to compare yet`,description:`The comparison needs people who use Copilot and people who don't in the same selection.`}):(0,K.jsx)(A,{text:I,children:(0,K.jsx)(S,{label:`A Copilot user's week, against everyone else's`,spec:Y.vegaLiteSpec,data:m,theme:e,header:{title:`A Copilot user's week, against everyone else's`,subtitle:`Per person, per week. Right of 1× means Copilot users do more of it. This compares the two groups; it doesn't show Copilot caused the gap.`}})})}),(0,K.jsx)(`div`,{className:`2xl:self-start`,children:(0,K.jsx)(h,{title:`How these figures are worked out`,notes:it(t)})})]}),(0,K.jsx)(`div`,{className:`flex h-[560px] flex-col`,children:d.data?.status===`error`?(0,K.jsx)(_,{className:`h-full`,message:d.data.error.message,onRetry:d.refetch}):d.isLoading||!y?(0,K.jsx)(g,{className:`h-full`}):y.rows.length===0?(0,K.jsx)(v,{className:`h-full`,title:`No ${t.plural} to compare`,description:te(`Nobody active on Microsoft 365 in this selection has ${l(t.noun)} in the org data.`,t)}):(0,K.jsx)(r,{columns:b,data:y,defaultSort:[{columnId:`People Active`,direction:`desc`}],theme:e,header:{title:`Copilot reach by ${t.noun}`,subtitle:`${E(j,`whole`)} ${j===1?t.noun:t.plural}. Active days, meetings and emails sent are per person, per week.${ne?` Those under 5 active people share one row.`:``}`}})})]})}var lt=_e(),ut=xe(),dt=Te(),ft=`Apps and devices`,pt=`How much of the Microsoft 365 suite each person uses, and where they work from.`,mt={perRow:40,chrome:100},ht=[{term:`Apps`,text:`Outlook, Teams, Word, Excel, PowerPoint and OneNote, opened at least once in the selection on any platform.`},{term:`Suite depth`,text:`How many of those six apps each active person opened. Someone who opened Word once counts the same as a daily user.`},{term:`No app use reported`,text:`The person was active on email, SharePoint, OneDrive or Viva Engage, but the apps report had nothing for them. It doesn't mean they did no work.`},{term:`Platforms`,text:`Windows, Mac, web and mobile, from the same apps report. Someone on a laptop and a phone counts on both, so the bars add up to more than 100%.`}];function X(e){let t=O(e);return{result:t,table:(0,B.useMemo)(()=>t.data?.status===`success`?k(t.data.table,e.columnMetadata):void 0,[t.data,e.columnMetadata])}}function Z({query:{result:e,table:t},spec:r,height:i,headline:a,title:o,subtitle:s,empty:c}){let{theme:l}=n();return(0,K.jsx)(`div`,{className:`h-[340px]`,style:i?{height:i}:void 0,children:e.data?.status===`error`?(0,K.jsx)(_,{className:`h-full`,message:e.data.error.message,onRetry:e.refetch}):e.isLoading||!t?(0,K.jsx)(g,{className:`h-full`}):t.rows.length===0?(0,K.jsx)(v,{className:`h-full`,title:c.title,description:c.description}):(0,K.jsx)(A,{text:a,children:(0,K.jsx)(S,{label:o,spec:r,data:t,theme:l,header:{title:o,subtitle:s}})})})}function Q(e){return e?.rows.length??0}function $(e,t){return t?e(t):void 0}function gt(){let e=X(lt),t=X(ut),n=X(dt),r=(0,B.useMemo)(()=>$(He,e.table),[e.table]),i=(0,B.useMemo)(()=>$(Ke,t.table),[t.table]),a=(0,B.useMemo)(()=>$(Ue,n.table),[n.table]),o=Q(t.table)>0,s=Math.max(Q(e.table),Q(t.table)),c=s>0?w(s,mt)+(r||i?40:0):void 0,l=Q(n.table)>0?w(Q(n.table),mt)+(a?40:0):void 0;return(0,K.jsx)(D,{id:u(`m365-suite`),title:ft,description:pt,children:(0,K.jsxs)(`div`,{className:`grid gap-400 xl:grid-cols-2`,children:[(0,K.jsx)(Z,{query:e,spec:lt.vegaLiteSpec,height:c,headline:r,title:`Which apps people open`,subtitle:`Share of active people, on desktop, web or mobile.`,empty:Re(`apps`,o)}),(0,K.jsx)(Z,{query:t,spec:ut.vegaLiteSpec,height:c,headline:i,title:`How much of the suite each person uses`,subtitle:`Share of active people by how many of the six apps they opened.`,empty:{title:`Nobody active`,description:`No one in the current selection was active on Microsoft 365.`}}),(0,K.jsx)(Z,{query:n,spec:dt.vegaLiteSpec,height:l,headline:a,title:`Where people work from`,subtitle:`Share of active people on each platform`,empty:Re(`platforms`,o)}),(0,K.jsx)(`div`,{className:`xl:self-start`,children:(0,K.jsx)(h,{title:`How these figures are worked out`,notes:ht})})]})})}function _t(){return b().m365Activity===`notConfigured`?(0,K.jsx)(yt,{}):(0,K.jsx)(vt,{})}function vt(){let e=P(),{show:t}=x();return e.state===`ready`?(0,K.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[t(`m365-activity`)&&(0,K.jsx)($e,{concealed:e.concealed}),t(`m365-suite`)&&(0,K.jsx)(gt,{}),t(`m365-copilot`)&&(0,K.jsx)(st,{concealed:e.concealed})]}):(0,K.jsx)(D,{id:u(`m365-activity`),title:R,description:z,children:e.state===`loading`?(0,K.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,children:[(0,K.jsx)(g,{}),(0,K.jsx)(g,{}),(0,K.jsx)(g,{}),(0,K.jsx)(g,{})]}):e.state===`error`?(0,K.jsx)(_,{message:e.error??`The semantic model didn't answer.`,onRetry:e.refetch}):e.state===`missing`?(0,K.jsx)(v,{title:`Microsoft 365 activity isn't set up`,description:(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(`p`,{children:`This install predates Microsoft 365 activity, so there's nothing to show yet.`}),(0,K.jsx)(y,{children:(0,K.jsx)(`p`,{children:`Update the install to add Microsoft 365 activity. The page fills in after the next pipeline run.`})})]})}):(0,K.jsx)(v,{title:`No Microsoft 365 activity yet`,description:(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(`p`,{children:`Either it's switched off or it hasn't loaded yet. The usage reports run two to three days behind.`}),(0,K.jsx)(y,{children:(0,K.jsx)(`p`,{children:`To switch it on, run the installer again and tick Microsoft 365 activity. It needs the Reports.Read.All permission.`})})]})})})}function yt(){return(0,K.jsx)(D,{id:u(`m365-activity`),title:R,description:z,children:(0,K.jsx)(v,{title:`Microsoft 365 activity isn't turned on`,description:(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(`p`,{children:`Microsoft 365 activity is an optional source that isn't connected.`}),(0,K.jsx)(y,{children:(0,K.jsx)(`p`,{children:`Run the installer again and tick Microsoft 365 activity. It needs Reports.Read.All, and the page fills in after the next load and model refresh.`})})]})})})}export{_t as WorkPatternsScreen};