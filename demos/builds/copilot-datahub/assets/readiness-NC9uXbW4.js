import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-CQOZoUwg.js";import{n}from"./theme.context-RSsoaF3c.js";import{t as r}from"./dist-DjvcfNLg.js";import{D as i,E as a,N as o,k as s,l as c,m as l,pt as u,t as d,wt as f}from"./utils-CCoPj5LP.js";import{E as p,T as m,w as h}from"./task-times.context-WIEQAetj.js";import{i as g}from"./stage-filter.context-DYufJONF.js";import{c as _}from"./root-Dy8LPudF.js";import{i as v,n as y,o as b,t as x}from"./kpi-card-D03NeHc2.js";import{t as ee}from"./filter-note-CLucH9Ek.js";import{t as S}from"./format-kpi-BhveZiQQ.js";import{t as C}from"./on-demand-B1wIfLh0.js";import{t as w}from"./section-p8LJFb5N.js";import{t as T}from"./use-filtered-query-C1v6Djsa.js";import{t as E}from"./to-data-table-DHzdyPpP.js";import{n as D,t as O}from"./top-n-B35DJvui.js";import{t as k}from"./headlined-M30l5QrR.js";import{i as A,n as j}from"./headline-CtXokBCs.js";import{i as M,n as te,r as ne}from"./list-total-B5FgpKuM.js";import{a as N,n as P,t as F}from"./heat-Cx7mdvL8.js";import{n as I,t as L}from"./agents-BIVn5orW.js";import{i as re,n as ie,r as ae,t as oe}from"./licensing-DVZXFuoX.js";import{i as R,n as z,r as B,t as V}from"./habit-licence-BJhfZtFB.js";import{t as se}from"./use-m365-activity-zrHXcWsv.js";var H=`EVALUATE\r
ROW(\r
    "Eligible Users", [Cowork Fit: Eligible Users],\r
    "Surfaces Per Day", [Cowork Fit: Surfaces Per Active Day],\r
    "Prompts Per Session", [Cowork Fit: Session Depth],\r
    "Agent User Share", [Cowork Fit: Agent User Share]\r
)`,U={"[Eligible Users]":{name:`Eligible Users`,displayName:`Eligible users`,format:`#,0`},"[Surfaces Per Day]":{name:`Surfaces Per Day`,displayName:`Apps per active day`,format:`0.0`},"[Prompts Per Session]":{name:`Prompts Per Session`,displayName:`Prompts per session`,format:`0.0`},"[Agent User Share]":{name:`Agent User Share`,displayName:`% already using agents`,format:l}};function W(){return{connection:`vl`,query:H,columnMetadata:U}}var G=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Org Data'[Organization],\r
            "@Eligible", [Cowork Fit: Eligible Users],\r
            "@Surfaces", [Cowork Readiness: Surfaces Per Day],\r
            "@Depth", [Cowork Readiness: Prompts Per Session],\r
            "@AgentShare", [Cowork Fit: Agent User Share]\r
        ),\r
        NOT ISBLANK('Chat + Agent Org Data'[Organization])\r
            && NOT ISBLANK([@Eligible])\r
            && NOT ISBLANK([@Surfaces])\r
    ),\r
    "Organization", 'Chat + Agent Org Data'[Organization],\r
    "Eligible Users", [@Eligible],\r
    "Surfaces Per Day", [@Surfaces],\r
    "Prompts Per Session", [@Depth],\r
    "Agent User Share", [@AgentShare]\r
)\r
ORDER BY [Surfaces Per Day] DESC`,ce={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Organization`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:200}},x:{field:`Surfaces Per Day`,type:`quantitative`,title:`Apps used per active day`,axis:{labelExpr:`format(datum.value, ',.1f')`}},tooltip:[{field:`Organization`,type:`nominal`,title:`Organization`},{field:`Surfaces Per Day`,type:`quantitative`,title:`Apps per active day`,format:`,.2f`},{field:`Prompts Per Session`,type:`quantitative`,title:`Prompts per session`,format:`,.2f`},{field:`Agent User Share`,type:`quantitative`,title:`Already using agents`,format:`.0%`},{field:`Eligible Users`,type:`quantitative`,title:`Eligible users`,format:`,.0f`}]}},K={"[Organization]":{name:`Organization`,displayName:`Organization`},"[Eligible Users]":{name:`Eligible Users`,displayName:`Eligible users`,format:`#,0`},"[Surfaces Per Day]":{name:`Surfaces Per Day`,displayName:`Apps per active day`,format:`0.0`},"[Prompts Per Session]":{name:`Prompts Per Session`,displayName:`Prompts per session`,format:`0.0`},"[Agent User Share]":{name:`Agent User Share`,displayName:`% already using agents`,format:l}};function q(){return{connection:`vl`,query:G,columnMetadata:K,vegaLiteSpec:ce}}var J=`EVALUATE\r
ROW(\r
    "Active Unlicensed Users", [Active Unlicensed Users],\r
    "Unlicensed Share", [Unlicensed Share of Active Users],\r
    "Median Sessions Per User Per Week", [Median Unlicensed Sessions Per User Per Week],\r
    "Observed Sessions Per User Per Week", [Observed Unlicensed Sessions per User per Week]\r
)\r
`,le={"[Active Unlicensed Users]":{name:`Active Unlicensed Users`,displayName:`Active unlicensed users`,format:`#,0`},"[Unlicensed Share]":{name:`Unlicensed Share`,displayName:`Unlicensed share`,format:l},"[Median Sessions Per User Per Week]":{name:`Median Sessions Per User Per Week`,displayName:`Median sessions per user per week`,format:`0.0`},"[Observed Sessions Per User Per Week]":{name:`Observed Sessions Per User Per Week`,displayName:`Observed sessions per user per week`,format:`0.0`}};function ue(){return{connection:`vl`,query:J,columnMetadata:le}}var de=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Org Data'[Organization],\r
            "@ActiveUnlicensed", [Active Unlicensed Users],\r
            "@ActiveDays", [Average Active Days Per User Per Week (Unlicensed Chat)],\r
            "@Sessions", [Observed Unlicensed Sessions per User per Week]\r
        ),\r
        NOT ISBLANK('Chat + Agent Org Data'[Organization])\r
            && COALESCE([@ActiveUnlicensed], 0) > 0\r
    ),\r
    "Organization", 'Chat + Agent Org Data'[Organization],\r
    "Active Unlicensed Users", [@ActiveUnlicensed],\r
    "Active Days Per Week", [@ActiveDays],\r
    "Sessions Per User Per Week", [@Sessions]\r
)\r
ORDER BY [Sessions Per User Per Week] DESC, [Active Unlicensed Users] DESC, [Organization]\r
`,fe={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Organization`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:200}},x:{field:`Sessions Per User Per Week`,type:`quantitative`,title:`Sessions per user per week`,axis:{labelExpr:`format(datum.value, ',.1f')`}},tooltip:[{field:`Organization`,type:`nominal`,title:`Organization`},{field:`Sessions Per User Per Week`,type:`quantitative`,title:`Sessions per user per week`,format:`,.2f`},{field:`Active Days Per Week`,type:`quantitative`,title:`Active days per week`,format:`,.2f`},{field:`Active Unlicensed Users`,type:`quantitative`,title:`Active unlicensed users`,format:`,.0f`}]}},pe={"[Organization]":{name:`Organization`,displayName:`Organization`},"[Active Unlicensed Users]":{name:`Active Unlicensed Users`,displayName:`Active unlicensed users`,format:`#,0`},"[Active Days Per Week]":{name:`Active Days Per Week`,displayName:`Active days per week`,format:`0.0`},"[Sessions Per User Per Week]":{name:`Sessions Per User Per Week`,displayName:`Sessions per user per week`,format:`0.0`}};function me(){return{connection:`vl`,query:de,columnMetadata:pe,vegaLiteSpec:fe}}var he=`EVALUATE\r
VAR __Month = [Last Full Month Start]\r
-- One row per person active in the month: their distinct active days, and\r
-- whether any of their activity was licensed or unlicensed. The day count\r
-- matches the Power, Habitual, Developing and Beginner measures.\r
VAR __People =\r
    FILTER(\r
        CALCULATETABLE(\r
            ADDCOLUMNS(\r
                VALUES('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
                "@Days", CALCULATE(DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[InteractionDate])),\r
                "@Licensed",\r
                    CALCULATE(\r
                        COUNTROWS('Chat + Agent Interactions (Audit Logs)'),\r
                        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[License Status] = "M365 Copilot Licensed")\r
                    ) > 0,\r
                "@Unlicensed",\r
                    CALCULATE(\r
                        COUNTROWS('Chat + Agent Interactions (Audit Logs)'),\r
                        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[License Status] = "Unlicensed")\r
                    ) > 0\r
            ),\r
            REMOVEFILTERS('Calendar'),\r
            'Chat + Agent Interactions (Audit Logs)'[MonthStart] = __Month\r
        ),\r
        LEN(TRIM('Chat + Agent Interactions (Audit Logs)'[Audit_UserId])) > 0\r
            && [@Days] > 0\r
    )\r
VAR __Cohorts =\r
    DATATABLE(\r
        "Cohort", STRING, "Cohort Order", INTEGER, "Low", INTEGER, "High", INTEGER,\r
        {\r
            { "Power", 1, 16, 31 },\r
            { "Habitual", 2, 11, 15 },\r
            { "Developing", 3, 6, 10 },\r
            { "Beginner", 4, 1, 5 }\r
        }\r
    )\r
RETURN\r
    SELECTCOLUMNS(\r
        __Cohorts,\r
        "Month", __Month,\r
        "Cohort", [Cohort],\r
        "Cohort Order", [Cohort Order],\r
        "Licensed",\r
            COUNTROWS(FILTER(__People, [@Licensed] && [@Days] >= [Low] && [@Days] <= [High])) + 0,\r
        -- Someone with any licensed activity counts as licensed, never both.\r
        "Unlicensed",\r
            COUNTROWS(\r
                FILTER(__People, NOT [@Licensed] && [@Unlicensed] && [@Days] >= [Low] && [@Days] <= [High])\r
            ) + 0\r
    )\r
ORDER BY [Cohort Order]\r
`,ge={"[Month]":{name:`Month`,displayName:`Month`,format:`mmmm yyyy`},"[Cohort]":{name:`Cohort`,displayName:`Habit`},"[Cohort Order]":{name:`Cohort Order`,displayName:`Order`,format:`#,0`},"[Licensed]":{name:`Licensed`,displayName:`Licensed`,format:`#,0`},"[Unlicensed]":{name:`Unlicensed`,displayName:`Unlicensed`,format:`#,0`}};function _e(){return{connection:`vl`,query:he,columnMetadata:ge}}var ve=`EVALUATE\r
VAR __Month = [Last Full Month Start]\r
VAR __People =\r
    FILTER(\r
        CALCULATETABLE(\r
            ADDCOLUMNS(\r
                VALUES('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
                "@Days", CALCULATE(DISTINCTCOUNT('Chat + Agent Interactions (Audit Logs)'[InteractionDate])),\r
                "@Licensed",\r
                    CALCULATE(\r
                        COUNTROWS('Chat + Agent Interactions (Audit Logs)'),\r
                        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[License Status] = "M365 Copilot Licensed")\r
                    ) > 0,\r
                "@Unlicensed",\r
                    CALCULATE(\r
                        COUNTROWS('Chat + Agent Interactions (Audit Logs)'),\r
                        KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[License Status] = "Unlicensed")\r
                    ) > 0\r
            ),\r
            REMOVEFILTERS('Calendar'),\r
            'Chat + Agent Interactions (Audit Logs)'[MonthStart] = __Month\r
        ),\r
        LEN(TRIM('Chat + Agent Interactions (Audit Logs)'[Audit_UserId])) > 0\r
            -- Power and Habitual: 11 or more active days in the month.\r
            && [@Days] >= 11\r
            && NOT [@Licensed]\r
            && [@Unlicensed]\r
    )\r
RETURN\r
    SELECTCOLUMNS(\r
        TOPN(10, __People, [@Days], DESC, 'Chat + Agent Interactions (Audit Logs)'[Audit_UserId], ASC),\r
        "User", 'Chat + Agent Interactions (Audit Logs)'[Audit_UserId],\r
        "Organization",\r
            LOOKUPVALUE(\r
                'Chat + Agent Org Data'[Organization],\r
                'Chat + Agent Org Data'[PersonId], 'Chat + Agent Interactions (Audit Logs)'[Audit_UserId]\r
            ),\r
        "Active Days", [@Days],\r
        "Cohort", IF([@Days] >= 16, "Power", "Habitual")\r
    )\r
ORDER BY [Active Days] DESC, [User]\r
`,ye={"[User]":{name:`User`,displayName:`User`},"[Organization]":{name:`Organization`,displayName:`Organization`},"[Active Days]":{name:`Active Days`,displayName:`Active days`,format:`#,0`},"[Cohort]":{name:`Cohort`,displayName:`Habit`}};function be(){return{connection:`vl`,query:ve,columnMetadata:ye}}var Y=e(t(),1),X=f(),xe=j({label:`Organization`,value:`Eligible Users`,of:`people yet to try Cowork`});function Se(e,t){return[{id:`Rank`,header:`Rank`,width:88,numericStyling:!0,cellRenderer:N({domain:P(t,`Rank`,{reverse:!0}),format:F(t,`Rank`)})},{id:`User`,header:`User`,width:260},{id:`Organization`,header:e,minWidth:160},{id:`Surfaces Per Day`,header:`Apps per active day`,numericStyling:!0},{id:`Prompts Per Session`,header:`Prompts per session`,numericStyling:!0},{id:`Uses Agents`,header:`Uses agents`}]}function Ce(){let e=o(),t=T(W()),n=(0,Y.useMemo)(()=>t.data?.status===`success`?s(t.data.table):void 0,[t.data]);return(0,X.jsxs)(w,{id:c(`cowork-readiness`),title:`Cowork readiness`,description:`Copilot users who haven't tried Cowork yet, the broadest and deepest everyday users first.`,children:[t.data?.status===`error`?(0,X.jsx)(m,{message:t.data.error.message,onRetry:t.refetch}):t.isLoading||!t.data?(0,X.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,children:[(0,X.jsx)(p,{}),(0,X.jsx)(p,{}),(0,X.jsx)(p,{}),(0,X.jsx)(p,{})]}):n?(0,X.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,children:[(0,X.jsx)(x,{label:`Could be offered Cowork`,value:a(n,`[Eligible Users]`),emphasis:!0}),(0,X.jsx)(x,{label:`Apps used per active day`,value:a(n,`[Surfaces Per Day]`),format:`rate`}),(0,X.jsx)(x,{label:`Prompts per session`,value:a(n,`[Prompts Per Session]`),format:`rate`}),(0,X.jsx)(x,{label:`Already using agents`,value:a(n,`[Agent User Share]`),format:`percent`})]}):(0,X.jsx)(h,{title:`Nobody to assess`,description:`The semantic model returned no rows. Check that the model has been refreshed since the last data load.`}),(0,X.jsx)(C,{id:`cowork-readiness-by-org`,label:`Show by ${e.noun}`,note:`Breadth of everyday use for each ${e.noun}, among people yet to try Cowork.`,children:(0,X.jsx)(we,{})}),(0,X.jsx)(C,{id:`cowork-candidates`,label:`Show the people`,note:`Everyone yet to try Cowork, readiest first.`,children:(0,X.jsx)(Te,{})})]})}function we(){let{theme:e}=n(),t=o(),r=(0,Y.useMemo)(()=>u(q(),t),[t]),i=T({connection:r.connection,query:r.query,columnMetadata:r.columnMetadata}),a=(0,Y.useMemo)(()=>i.data?.status===`success`?E(i.data.table,r.columnMetadata):void 0,[i.data,r.columnMetadata]),s=(0,Y.useMemo)(()=>a?xe(a):void 0,[a]),c=(0,Y.useMemo)(()=>a?D(a,{label:`Organization`,by:`Eligible Users`}):void 0,[a]);return(0,X.jsx)(`div`,{className:`h-[340px]`,style:c?{height:b(c.table.rows.length,{perRow:40,chrome:100})+(s?40:0)}:void 0,children:i.data?.status===`error`?(0,X.jsx)(m,{className:`h-full`,message:i.data.error.message,onRetry:i.refetch}):i.isLoading||!c?(0,X.jsx)(p,{className:`h-full`}):c.table.rows.length===0?(0,X.jsx)(h,{className:`h-full`,title:`No ${t.plural} to compare`,description:`Nobody without Cowork has recorded Copilot use in this period.`}):(0,X.jsx)(k,{text:s,children:(0,X.jsx)(v,{label:`Breadth of use by ${t.noun}`,spec:r.vegaLiteSpec,data:c.table,theme:e,header:{title:`Breadth of use by ${t.noun}`,subtitle:O(c,t.plural,`eligible users`)??`Apps used per active day, among people who have not tried Cowork`}})})})}function Te(){let{theme:e}=n(),t=o(),i=(0,Y.useMemo)(()=>u(L(),t),[t]),a=T({connection:i.connection,query:i.query,columnMetadata:i.columnMetadata}),s=(0,Y.useMemo)(()=>a.data?.status===`success`?E(a.data.table,i.columnMetadata):void 0,[a.data,i.columnMetadata]),c=(0,Y.useMemo)(()=>Se(t.label,s),[t.label,s]),l=s?I(s):!1;return(0,X.jsxs)(X.Fragment,{children:[l&&(0,X.jsx)(`p`,{className:`max-w-[80ch] text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:`Every candidate averages the same number of prompts per session, so depth does not separate anyone yet. Breadth of everyday use and agent use decide the ranking.`}),(0,X.jsx)(`div`,{className:`flex h-[560px] flex-col`,children:a.data?.status===`error`?(0,X.jsx)(m,{className:`h-full`,message:a.data.error.message,onRetry:a.refetch}):a.isLoading||!s?(0,X.jsx)(p,{className:`h-full`}):s.rows.length===0?(0,X.jsx)(h,{className:`h-full`,title:`Nobody to rank`,description:`Everyone with recorded Copilot use has already tried Cowork, or nobody has used Copilot in this period.`}):(0,X.jsx)(r,{columns:c,data:s,defaultSort:[{columnId:`Rank`,direction:`asc`}],theme:e,header:{title:`Who to offer Cowork next`,subtitle:`${S(te(s),`whole`)} people, readiest first`}})}),s&&!a.isLoading&&a.data?.status===`success`&&(0,X.jsx)(M,{shown:s.rows.length,total:ne(s),noun:`people`,by:`by readiness`})]})}var Ee={Power:`16 or more active days`,Habitual:`11 to 15 active days`,Developing:`6 to 10 active days`,Beginner:`1 to 5 active days`},Z=`px-300 py-200 text-right tabular-nums`,Q=`px-300 py-200 font-normal`;function De({matrix:e}){return(0,X.jsxs)(`table`,{className:`w-full max-w-[720px] border-collapse text-left`,children:[(0,X.jsxs)(`caption`,{className:`sr-only`,children:[`People active in `,B(e.month),`, by habit and licence`]}),(0,X.jsx)(`thead`,{className:d(_,`text-muted-foreground`),children:(0,X.jsxs)(`tr`,{className:`border-b border-border`,children:[(0,X.jsx)(`th`,{scope:`col`,className:Q,children:`Habit`}),(0,X.jsx)(`th`,{scope:`col`,className:d(Q,`text-right`),children:`Licensed`}),(0,X.jsx)(`th`,{scope:`col`,className:d(Q,`text-right`),children:`Unlicensed`}),(0,X.jsx)(`th`,{scope:`col`,className:d(Q,`text-right`),children:`Share unlicensed`})]})}),(0,X.jsx)(`tbody`,{className:`text-[length:var(--text-300)]`,children:e.rows.map(e=>{let t=e.licensed+e.unlicensed,n=V.includes(e.habit)&&e.unlicensed>0;return(0,X.jsxs)(`tr`,{className:`border-b border-border last:border-b-0`,children:[(0,X.jsxs)(`th`,{scope:`row`,className:`px-300 py-200 font-normal`,children:[(0,X.jsx)(`span`,{className:`block text-foreground`,children:e.habit}),(0,X.jsx)(`span`,{className:d(_,`block text-muted-foreground`),children:Ee[e.habit]})]}),(0,X.jsx)(`td`,{className:Z,children:S(e.licensed,`whole`)}),(0,X.jsx)(`td`,{className:d(Z,n&&`bg-secondary font-semibold text-foreground`),children:S(e.unlicensed,`whole`)}),(0,X.jsx)(`td`,{className:d(Z,`text-muted-foreground`),children:t>=5?A(e.unlicensed,t):`–`})]},e.habit)})})]})}var Oe=e=>[{id:`User`,header:`User`,width:260},{id:`Organization`,header:e,minWidth:160},{id:`Cohort`,header:`Habit`,width:112},{id:`Active Days`,header:`Active days`,width:116,numericStyling:!0}];function ke(){let{theme:e}=n(),t=o(),i=_e(),a=T({connection:i.connection,query:i.query,columnMetadata:i.columnMetadata}),s=(0,Y.useMemo)(()=>u(be(),t),[t]),l=T({connection:s.connection,query:s.query,columnMetadata:s.columnMetadata}),f=(0,Y.useMemo)(()=>a.data?.status===`success`?R(E(a.data.table,i.columnMetadata)):void 0,[a.data,i.columnMetadata]),g=(0,Y.useMemo)(()=>l.data?.status===`success`?E(l.data.table,s.columnMetadata):void 0,[l.data,s.columnMetadata]),v=(0,Y.useMemo)(()=>Oe(t.label),[t.label]),y=f!==void 0&&f.licensed+f.unlicensed===0,b=f!==void 0&&!y&&f.licensed===0,x=f?z(f):void 0;return(0,X.jsxs)(w,{id:c(`habit-licence`),title:`Heavy users without a licence`,description:`People active last month, by how often they used Copilot and whether they had a licence.`,children:[a.data?.status===`error`?(0,X.jsx)(m,{message:a.data.error.message,onRetry:a.refetch}):a.isLoading||!f?(0,X.jsx)(p,{className:`h-[240px]`}):y?(0,X.jsx)(h,{title:`No activity last month`,description:`Nobody used Copilot in the last full month the selected dates reach.`}):(0,X.jsxs)(`div`,{className:`flex flex-col gap-300`,children:[x&&(0,X.jsx)(`p`,{className:`max-w-[90ch] text-[length:var(--text-300)] leading-300 text-foreground`,children:x}),(0,X.jsx)(De,{matrix:f}),(0,X.jsxs)(`p`,{className:d(_,`max-w-[90ch] text-muted-foreground`),children:[`Habits count the distinct days each person used Copilot in `,B(f.month),`, as on the Adoption page. Anyone with any licensed activity counts as licensed. This compares groups; it doesn't show what a licence would change.`]})]}),f&&!y&&!b&&(0,X.jsx)(`div`,{className:`flex h-[480px] flex-col`,children:l.data?.status===`error`?(0,X.jsx)(m,{className:`h-full`,message:l.data.error.message,onRetry:l.refetch}):l.isLoading||!g?(0,X.jsx)(p,{className:`h-full`}):g.rows.length===0?(0,X.jsx)(h,{className:`h-full`,title:`No heavy unlicensed users`,description:`Nobody without a licence was active on 11 or more days in ${B(f.month)}.`}):(0,X.jsx)(r,{columns:v,data:g,defaultSort:[{columnId:`Active Days`,direction:`desc`}],theme:e,header:{title:`Most active without a licence`,subtitle:`The ${S(g.rows.length,`whole`)} unlicensed ${g.rows.length===1?`person`:`people`} active on the most days in ${B(f.month)}. The full ranked list is above, under Who to license next.`}})})]})}var $=[`dateRange`,`organizations`],Ae=j({label:`Organization`,value:`Active Unlicensed Users`,of:`active unlicensed users`}),je=j({label:`Dormancy Bucket`,value:`Licensed Users`,of:`licensed users`});function Me(e,t,n){let r=[{id:`Rank`,header:`Rank`,width:88,numericStyling:!0},{id:`User`,header:`User`,width:260},{id:`Organization`,header:e,minWidth:160},{id:`Priority Score`,header:`Priority score`,width:124,numericStyling:!0,cellRenderer:N({domain:P(t,`Priority Score`),format:F(t,`Priority Score`)})},{id:`Sessions Per Week`,header:`Sessions`,width:96,numericStyling:!0},{id:`Active Days Per Week`,header:`Active days`,width:116,numericStyling:!0}];return n&&r.push({id:`Workloads Per Day`,header:`Workloads per day`,width:156,numericStyling:!0}),r}function Ne(){let{theme:e}=n(),t=o(),l=T(ue()),f=T(re(),{ignore:$}),g=(0,Y.useMemo)(()=>u(me(),t),[t]),_=T({connection:g.connection,query:g.query,columnMetadata:g.columnMetadata}),C=se(),A=C.state===`ready`&&!C.concealed,j=(0,Y.useMemo)(()=>u(A?ie():ae(),t),[A,t]),N=T({connection:j.connection,query:C.state===`loading`?``:j.query}),P=oe(),F=T({connection:P.connection,query:P.query},{ignore:$}),I=(0,Y.useMemo)(()=>l.data?.status===`success`?s(l.data.table):void 0,[l.data]),L=(0,Y.useMemo)(()=>f.data?.status===`success`?s(f.data.table):void 0,[f.data]),R=(0,Y.useMemo)(()=>_.data?.status===`success`?E(_.data.table,g.columnMetadata):void 0,[_.data,g.columnMetadata]),z=(0,Y.useMemo)(()=>N.data?.status===`success`?E(N.data.table,j.columnMetadata):void 0,[N.data,j.columnMetadata]),B=(0,Y.useMemo)(()=>Me(t.label,z,A),[t.label,z,A]),V=(0,Y.useMemo)(()=>F.data?.status===`success`?E(F.data.table,P.columnMetadata):void 0,[F.data,P.columnMetadata]),H=(0,Y.useMemo)(()=>R?Ae(R):void 0,[R]),U=(0,Y.useMemo)(()=>R?D(R,{label:`Organization`,by:`Active Unlicensed Users`}):void 0,[R]),W=(0,Y.useMemo)(()=>V?je(V):void 0,[V]),G=l.data?.status===`error`?{message:l.data.error.message,retry:l.refetch}:f.data?.status===`error`?{message:f.data.error.message,retry:f.refetch}:void 0,ce=l.isLoading||!l.data||f.isLoading||!f.data,K=i(L,`[License Evidence Notice]`),q=i(L,`[Reclaim Cost Notice]`),J=a(L,`[License Inventory Usable]`)===0;return(0,X.jsxs)(w,{id:c(`license-readiness`),title:`License readiness`,description:`Who is already reaching for Copilot without a license, and which licenses are sitting idle.`,children:[J&&(0,X.jsx)(`p`,{role:`status`,className:d(`text-[length:var(--text-200)] leading-200`,`max-w-[90ch] rounded-md bg-secondary px-300 py-200 text-foreground`),children:`Licenses don't match the people using Copilot, so everyone here counts as unlicensed and the list below may include people who already have a license. This is usually because Microsoft 365 reports hide user names: in the Microsoft 365 admin center, go to Settings > Org settings > Reports, untick "Display concealed user, group, and site names in all reports", then run the pipeline again.`}),G?(0,X.jsx)(m,{message:G.message,onRetry:G.retry}):ce?(0,X.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-3`,children:[(0,X.jsx)(p,{}),(0,X.jsx)(p,{}),(0,X.jsx)(p,{})]}):!I&&!L?(0,X.jsx)(h,{title:`No license readiness data`,description:`The semantic model returned no rows for the current selection.`}):(0,X.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-3`,children:[(0,X.jsx)(x,{label:`Active unlicensed users`,value:a(I,`[Active Unlicensed Users]`),emphasis:!0,detail:(0,X.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,X.jsx)(y,{label:`Share of active users`,value:a(I,`[Unlicensed Share]`),format:`percent`}),(0,X.jsx)(y,{label:`Median sessions/user/week`,value:a(I,`[Median Sessions Per User Per Week]`),format:`rate`})]})}),(0,X.jsx)(x,{label:`Observed unlicensed use`,value:a(I,`[Observed Sessions Per User Per Week]`),format:`rate`,detail:`sessions per user per week, averaged across the active unlicensed population`}),(0,X.jsx)(x,{label:`License estate`,value:a(L,`[Total Licensed Users]`),detail:(0,X.jsx)(y,{label:`Avg days since last active`,value:a(L,`[Avg Days Since Last Active]`),format:`whole`})})]}),(0,X.jsx)(ee,{ignored:$,reason:`the estate card, dormancy chart and notices read the license roster, which is not dated and has no independent organization dimension.`}),(0,X.jsx)(`div`,{className:`h-[340px]`,style:U?{height:b(U.table.rows.length,{perRow:40,chrome:100})+(H?40:0)}:void 0,children:_.data?.status===`error`?(0,X.jsx)(m,{className:`h-full`,message:_.data.error.message,onRetry:_.refetch}):_.isLoading||!U?(0,X.jsx)(p,{className:`h-full`}):U.table.rows.length===0?(0,X.jsx)(h,{className:`h-full`,title:`No unlicensed demand by ${t.noun}`,description:`No ${t.noun} has active unlicensed Copilot use in the current selection.`}):(0,X.jsx)(k,{text:H,children:(0,X.jsx)(v,{label:`Priority by ${t.noun}`,spec:g.vegaLiteSpec,data:U.table,theme:e,header:{title:`Priority by ${t.noun}`,subtitle:O(U,t.plural,`active unlicensed users`)??`Sessions per user per week among active unlicensed users`}})})}),(0,X.jsx)(`div`,{className:`flex h-[560px] flex-col`,children:N.data?.status===`error`?(0,X.jsx)(m,{className:`h-full`,message:N.data.error.message,onRetry:N.refetch}):N.isLoading||!z?(0,X.jsx)(p,{className:`h-full`}):z.rows.length===0?(0,X.jsx)(h,{className:`h-full`,title:`Nobody to license next`,description:`No active unlicensed users have enough observed activity to rank in the current selection.`}):(0,X.jsx)(r,{columns:B,data:z,defaultSort:[{columnId:`Rank`,direction:`asc`}],theme:e,header:{title:`Who to license next`,subtitle:`${S(te(z),`whole`)} unlicensed users, ranked by priority score${A?`: how much they use Copilot, and how many Microsoft 365 workloads they use a day`:``}. Sessions and active days are per week.${J?` Some may already have a license: see the note above.`:``}`}})}),z&&!N.isLoading&&N.data?.status===`success`&&(0,X.jsx)(M,{shown:z.rows.length,total:ne(z),noun:`unlicensed users`,by:`by priority score`}),(0,X.jsx)(`div`,{className:`h-[340px]`,style:V?{height:b(V.rows.length,{perRow:40,chrome:100})+(W?40:0)}:void 0,children:F.data?.status===`error`?(0,X.jsx)(m,{className:`h-full`,message:F.data.error.message,onRetry:F.refetch}):F.isLoading||!V?(0,X.jsx)(p,{className:`h-full`}):V.rows.length===0?(0,X.jsx)(h,{className:`h-full`,title:J?`Dormancy can't be measured yet`:`No license roster`,description:J?`Licenses don't match the people using Copilot, so there's no way to tell which seats are idle. See the note at the top of this section.`:`The license inventory returned no dormancy buckets to show.`}):(0,X.jsx)(k,{text:W,children:(0,X.jsx)(v,{label:`Dormancy of the license estate`,spec:P.vegaLiteSpec,data:V,theme:e,header:{title:`Dormancy of the license estate`,subtitle:`Licensed users by last activity bucket`}})})}),(K||q)&&(0,X.jsxs)(`div`,{className:`flex flex-col gap-200`,children:[K&&(0,X.jsx)(`p`,{className:`max-w-[90ch] text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:K}),q&&(0,X.jsx)(`p`,{className:`max-w-[90ch] text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:q})]})]})}function Pe(){let{show:e}=g();return(0,X.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[e(`license-readiness`)&&(0,X.jsx)(Ne,{}),e(`habit-licence`)&&(0,X.jsx)(ke,{}),e(`cowork-readiness`)&&(0,X.jsx)(Ce,{})]})}export{Pe as ReadinessScreen};