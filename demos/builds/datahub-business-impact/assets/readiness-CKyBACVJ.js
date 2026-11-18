import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{n as t}from"./createLucideIcon-BXuy7Wl9.js";import{D as n,E as r,N as i,k as a,l as o,m as s,t as c}from"./utils-DnEkKV8k.js";import{n as l}from"./theme.context-DAf6QFTA.js";import{t as u}from"./dist-C6OMN8hb.js";import{F as d,r as f}from"./filter.context-B12W-yPP.js";import{E as p,T as m,w as h}from"./task-times.context-EYcU9ots.js";import{i as g}from"./stage-filter.context-BO0XkIwy.js";import{c as _}from"./root-CRApTEns.js";import{i as v,n as y,o as b,t as x}from"./kpi-card-DKYJImkv.js";import{t as S}from"./format-kpi-BhveZiQQ.js";import{t as C}from"./on-demand-DdbjtAQ9.js";import{t as w}from"./section-D7HRVQ3G.js";import{t as T}from"./use-filtered-query-bX9pIfdQ.js";import{t as E}from"./to-data-table-DHzdyPpP.js";import{n as D,t as ee}from"./top-n-B35DJvui.js";import{t as O}from"./headlined-xiHxdKsC.js";import{i as k,n as A}from"./headline-CtXokBCs.js";import{t as te}from"./not-filtered-hint-DfNXycMa.js";import{i as ne,n as j,r as M}from"./list-total-BDHKpnBZ.js";import{a as N,n as P,t as F}from"./heat-8QSkQ0lH.js";import{n as I,t as L}from"./agents-B-Fx0Miy.js";import{i as re,n as ie,r as ae,t as oe}from"./licensing-BigloHJ9.js";import{i as R,n as z,r as B,t as V}from"./habit-licence-BJhfZtFB.js";import{t as se}from"./use-m365-activity-jE4MHxvB.js";var H=`EVALUATE\r
ROW(\r
    "Eligible Users", [Cowork Fit: Eligible Users],\r
    "Surfaces Per Day", [Cowork Fit: Surfaces Per Active Day],\r
    "Prompts Per Session", [Cowork Fit: Session Depth],\r
    "Agent User Share", [Cowork Fit: Agent User Share]\r
)`,U={"[Eligible Users]":{name:`Eligible Users`,displayName:`Eligible users`,format:`#,0`},"[Surfaces Per Day]":{name:`Surfaces Per Day`,displayName:`Apps per active day`,format:`0.0`},"[Prompts Per Session]":{name:`Prompts Per Session`,displayName:`Prompts per session`,format:`0.0`},"[Agent User Share]":{name:`Agent User Share`,displayName:`% already using agents`,format:s}};function W(){return{connection:`vl`,query:H,columnMetadata:U}}var G=`EVALUATE\r
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
ORDER BY [Surfaces Per Day] DESC`,K={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Organization`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:200}},x:{field:`Surfaces Per Day`,type:`quantitative`,title:`Apps used per active day`,axis:{labelExpr:`format(datum.value, ',.1f')`}},tooltip:[{field:`Organization`,type:`nominal`,title:`Organization`},{field:`Surfaces Per Day`,type:`quantitative`,title:`Apps per active day`,format:`,.2f`},{field:`Prompts Per Session`,type:`quantitative`,title:`Prompts per session`,format:`,.2f`},{field:`Agent User Share`,type:`quantitative`,title:`Already using agents`,format:`.0%`},{field:`Eligible Users`,type:`quantitative`,title:`Eligible users`,format:`,.0f`}]}},q={"[Organization]":{name:`Organization`,displayName:`Organization`},"[Eligible Users]":{name:`Eligible Users`,displayName:`Eligible users`,format:`#,0`},"[Surfaces Per Day]":{name:`Surfaces Per Day`,displayName:`Apps per active day`,format:`0.0`},"[Prompts Per Session]":{name:`Prompts Per Session`,displayName:`Prompts per session`,format:`0.0`},"[Agent User Share]":{name:`Agent User Share`,displayName:`% already using agents`,format:s}};function J(){return{connection:`vl`,query:G,columnMetadata:q,vegaLiteSpec:K}}var Y=`EVALUATE\r
ROW(\r
    "Active Unlicensed Users", [Active Unlicensed Users],\r
    "Unlicensed Share", [Unlicensed Share of Active Users],\r
    "Median Sessions Per User Per Week", [Median Unlicensed Sessions Per User Per Week],\r
    "Observed Sessions Per User Per Week", [Observed Unlicensed Sessions per User per Week]\r
)\r
`,ce={"[Active Unlicensed Users]":{name:`Active Unlicensed Users`,displayName:`Active unlicensed users`,format:`#,0`},"[Unlicensed Share]":{name:`Unlicensed Share`,displayName:`Unlicensed share`,format:s},"[Median Sessions Per User Per Week]":{name:`Median Sessions Per User Per Week`,displayName:`Median sessions per user per week`,format:`0.0`},"[Observed Sessions Per User Per Week]":{name:`Observed Sessions Per User Per Week`,displayName:`Observed sessions per user per week`,format:`0.0`}};function le(){return{connection:`vl`,query:Y,columnMetadata:ce}}var ue=`EVALUATE\r
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
`,de={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Organization`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:200}},x:{field:`Sessions Per User Per Week`,type:`quantitative`,title:`Sessions per user per week`,axis:{labelExpr:`format(datum.value, ',.1f')`}},tooltip:[{field:`Organization`,type:`nominal`,title:`Organization`},{field:`Sessions Per User Per Week`,type:`quantitative`,title:`Sessions per user per week`,format:`,.2f`},{field:`Active Days Per Week`,type:`quantitative`,title:`Active days per week`,format:`,.2f`},{field:`Active Unlicensed Users`,type:`quantitative`,title:`Active unlicensed users`,format:`,.0f`}]}},fe={"[Organization]":{name:`Organization`,displayName:`Organization`},"[Active Unlicensed Users]":{name:`Active Unlicensed Users`,displayName:`Active unlicensed users`,format:`#,0`},"[Active Days Per Week]":{name:`Active Days Per Week`,displayName:`Active days per week`,format:`0.0`},"[Sessions Per User Per Week]":{name:`Sessions Per User Per Week`,displayName:`Sessions per user per week`,format:`0.0`}};function pe(){return{connection:`vl`,query:ue,columnMetadata:fe,vegaLiteSpec:de}}var me=`EVALUATE\r
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
`,he={"[Month]":{name:`Month`,displayName:`Month`,format:`mmmm yyyy`},"[Cohort]":{name:`Cohort`,displayName:`Habit`},"[Cohort Order]":{name:`Cohort Order`,displayName:`Order`,format:`#,0`},"[Licensed]":{name:`Licensed`,displayName:`Licensed`,format:`#,0`},"[Unlicensed]":{name:`Unlicensed`,displayName:`Unlicensed`,format:`#,0`}};function ge(){return{connection:`vl`,query:me,columnMetadata:he}}var _e=`EVALUATE\r
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
`,ve={"[User]":{name:`User`,displayName:`User`},"[Organization]":{name:`Organization`,displayName:`Organization`},"[Active Days]":{name:`Active Days`,displayName:`Active days`,format:`#,0`},"[Cohort]":{name:`Cohort`,displayName:`Habit`}};function ye(){return{connection:`vl`,query:_e,columnMetadata:ve}}var X=e(t(),1),Z=i(),be=A({label:`Organization`,value:`Eligible Users`,of:`people yet to try Cowork`});function xe(e,t){return[{id:`Rank`,header:`Rank`,width:88,numericStyling:!0,cellRenderer:N({domain:P(t,`Rank`,{reverse:!0}),format:F(t,`Rank`)})},{id:`User`,header:`User`,width:260},{id:`Organization`,header:e,minWidth:160},{id:`Surfaces Per Day`,header:`Apps per active day`,numericStyling:!0},{id:`Prompts Per Session`,header:`Prompts per session`,numericStyling:!0},{id:`Uses Agents`,header:`Uses agents`}]}function Se(){let e=f(),t=T(W()),n=(0,X.useMemo)(()=>t.data?.status===`success`?a(t.data.table):void 0,[t.data]);return(0,Z.jsxs)(w,{id:o(`cowork-readiness`),title:`Cowork readiness`,description:`Copilot users who haven't tried Cowork yet, the broadest and deepest everyday users first.`,children:[t.data?.status===`error`?(0,Z.jsx)(m,{message:t.data.error.message,onRetry:t.refetch}):t.isLoading||!t.data?(0,Z.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,children:[(0,Z.jsx)(p,{}),(0,Z.jsx)(p,{}),(0,Z.jsx)(p,{}),(0,Z.jsx)(p,{})]}):n?(0,Z.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,children:[(0,Z.jsx)(x,{label:`Could be offered Cowork`,value:r(n,`[Eligible Users]`),emphasis:!0}),(0,Z.jsx)(x,{label:`Apps used per active day`,value:r(n,`[Surfaces Per Day]`),format:`rate`}),(0,Z.jsx)(x,{label:`Prompts per session`,value:r(n,`[Prompts Per Session]`),format:`rate`}),(0,Z.jsx)(x,{label:`Already using agents`,value:r(n,`[Agent User Share]`),format:`percent`})]}):(0,Z.jsx)(h,{title:`Nobody to assess`,description:`The semantic model returned no rows. Check that the model has been refreshed since the last data load.`}),(0,Z.jsx)(C,{id:`cowork-readiness-by-org`,label:`Show by ${e.noun}`,note:`Breadth of everyday use for each ${e.noun}, among people yet to try Cowork.`,children:(0,Z.jsx)(Ce,{})}),(0,Z.jsx)(C,{id:`cowork-candidates`,label:`Show the people`,note:`Licensed Microsoft 365 Copilot users yet to try Cowork, ranked among licensed users only.`,children:(0,Z.jsx)(we,{})})]})}function Ce(){let{theme:e}=l(),t=f(),n=(0,X.useMemo)(()=>d(J(),t),[t]),r=T({connection:n.connection,query:n.query,columnMetadata:n.columnMetadata}),i=(0,X.useMemo)(()=>r.data?.status===`success`?E(r.data.table,n.columnMetadata):void 0,[r.data,n.columnMetadata]),a=(0,X.useMemo)(()=>i?be(i):void 0,[i]),o=(0,X.useMemo)(()=>i?D(i,{label:`Organization`,by:`Eligible Users`}):void 0,[i]);return(0,Z.jsx)(`div`,{className:`h-[340px]`,style:o?{height:b(o.table.rows.length,{perRow:40,chrome:100})+(a?40:0)}:void 0,children:r.data?.status===`error`?(0,Z.jsx)(m,{className:`h-full`,message:r.data.error.message,onRetry:r.refetch}):r.isLoading||!o?(0,Z.jsx)(p,{className:`h-full`}):o.table.rows.length===0?(0,Z.jsx)(h,{className:`h-full`,title:`No ${t.plural} to compare`,description:`Nobody without Cowork has recorded Copilot use in this period.`}):(0,Z.jsx)(O,{text:a,children:(0,Z.jsx)(v,{label:`Breadth of use by ${t.noun}`,spec:n.vegaLiteSpec,data:o.table,theme:e,header:{title:`Breadth of use by ${t.noun}`,subtitle:ee(o,t.plural,`eligible users`)??`Apps used per active day, among people who have not tried Cowork`}})})})}function we(){let{theme:e}=l(),t=f(),n=(0,X.useMemo)(()=>d(L(),t),[t]),r=T({connection:n.connection,query:n.query,columnMetadata:n.columnMetadata}),i=(0,X.useMemo)(()=>r.data?.status===`success`?E(r.data.table,n.columnMetadata):void 0,[r.data,n.columnMetadata]),a=(0,X.useMemo)(()=>xe(t.label,i),[t.label,i]),o=i?I(i):!1;return(0,Z.jsxs)(Z.Fragment,{children:[o&&(0,Z.jsx)(`p`,{className:`max-w-[80ch] text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:`Every candidate averages the same number of prompts per session, so depth does not separate anyone yet. Breadth of everyday use and agent use decide the ranking.`}),(0,Z.jsx)(`div`,{className:`flex h-[560px] flex-col`,children:r.data?.status===`error`?(0,Z.jsx)(m,{className:`h-full`,message:r.data.error.message,onRetry:r.refetch}):r.isLoading||!i?(0,Z.jsx)(p,{className:`h-full`}):i.rows.length===0?(0,Z.jsx)(h,{className:`h-full`,title:`Nobody to rank`,description:`No licensed Microsoft 365 Copilot users with recorded use are yet to try Cowork in this selection.`}):(0,Z.jsx)(u,{columns:a,data:i,defaultSort:[{columnId:`Rank`,direction:`asc`}],theme:e,header:{title:`Who to offer Cowork next`,subtitle:`${S(j(i),`whole`)} licensed users, readiest first`}})}),i&&!r.isLoading&&r.data?.status===`success`&&(0,Z.jsx)(ne,{shown:i.rows.length,total:M(i),noun:`licensed users`,by:`by readiness`})]})}var Te={Power:`16 or more active days`,Habitual:`11 to 15 active days`,Developing:`6 to 10 active days`,Beginner:`1 to 5 active days`},Q=`px-300 py-200 text-right tabular-nums`,$=`px-300 py-200 font-normal`;function Ee({matrix:e}){return(0,Z.jsxs)(`table`,{className:`w-full max-w-[720px] border-collapse text-left`,children:[(0,Z.jsxs)(`caption`,{className:`sr-only`,children:[`People active in `,B(e.month),`, by habit and licence`]}),(0,Z.jsx)(`thead`,{className:c(_,`text-muted-foreground`),children:(0,Z.jsxs)(`tr`,{className:`border-b border-border`,children:[(0,Z.jsx)(`th`,{scope:`col`,className:$,children:`Habit`}),(0,Z.jsx)(`th`,{scope:`col`,className:c($,`text-right`),children:`Licensed`}),(0,Z.jsx)(`th`,{scope:`col`,className:c($,`text-right`),children:`Unlicensed`}),(0,Z.jsx)(`th`,{scope:`col`,className:c($,`text-right`),children:`Share unlicensed`})]})}),(0,Z.jsx)(`tbody`,{className:`text-[length:var(--text-300)]`,children:e.rows.map(e=>{let t=e.licensed+e.unlicensed,n=V.includes(e.habit)&&e.unlicensed>0;return(0,Z.jsxs)(`tr`,{className:`border-b border-border last:border-b-0`,children:[(0,Z.jsxs)(`th`,{scope:`row`,className:`px-300 py-200 font-normal`,children:[(0,Z.jsx)(`span`,{className:`block text-foreground`,children:e.habit}),(0,Z.jsx)(`span`,{className:c(_,`block text-muted-foreground`),children:Te[e.habit]})]}),(0,Z.jsx)(`td`,{className:Q,children:S(e.licensed,`whole`)}),(0,Z.jsx)(`td`,{className:c(Q,n&&`bg-secondary font-semibold text-foreground`),children:S(e.unlicensed,`whole`)}),(0,Z.jsx)(`td`,{className:c(Q,`text-muted-foreground`),children:t>=5?k(e.unlicensed,t):`–`})]},e.habit)})})]})}var De=e=>[{id:`User`,header:`User`,width:260},{id:`Organization`,header:e,minWidth:160},{id:`Cohort`,header:`Habit`,width:112},{id:`Active Days`,header:`Active days`,width:116,numericStyling:!0}];function Oe(){let{theme:e}=l(),t=f(),n=ge(),r=T({connection:n.connection,query:n.query,columnMetadata:n.columnMetadata}),i=(0,X.useMemo)(()=>d(ye(),t),[t]),a=T({connection:i.connection,query:i.query,columnMetadata:i.columnMetadata}),s=(0,X.useMemo)(()=>r.data?.status===`success`?R(E(r.data.table,n.columnMetadata)):void 0,[r.data,n.columnMetadata]),g=(0,X.useMemo)(()=>a.data?.status===`success`?E(a.data.table,i.columnMetadata):void 0,[a.data,i.columnMetadata]),v=(0,X.useMemo)(()=>De(t.label),[t.label]),y=s!==void 0&&s.licensed+s.unlicensed===0,b=s!==void 0&&!y&&s.licensed===0,x=s?z(s):void 0;return(0,Z.jsxs)(w,{id:o(`habit-licence`),title:`Heavy users without a licence`,description:`People active last month, by how often they used Copilot and whether they had a licence.`,children:[r.data?.status===`error`?(0,Z.jsx)(m,{message:r.data.error.message,onRetry:r.refetch}):r.isLoading||!s?(0,Z.jsx)(p,{className:`h-[240px]`}):y?(0,Z.jsx)(h,{title:`No activity last month`,description:`Nobody used Copilot in the last full month the selected dates reach.`}):(0,Z.jsxs)(`div`,{className:`flex flex-col gap-300`,children:[x&&(0,Z.jsx)(`p`,{className:`max-w-[90ch] text-[length:var(--text-300)] leading-300 text-foreground`,children:x}),(0,Z.jsx)(Ee,{matrix:s}),(0,Z.jsxs)(`p`,{className:c(_,`max-w-[90ch] text-muted-foreground`),children:[`Habits count the distinct days each person used Copilot in `,B(s.month),`, as on the Adoption page. Anyone with any licensed activity counts as licensed. This compares groups; it doesn't show what a licence would change.`]})]}),s&&!y&&!b&&(0,Z.jsx)(`div`,{className:`flex h-[480px] flex-col`,children:a.data?.status===`error`?(0,Z.jsx)(m,{className:`h-full`,message:a.data.error.message,onRetry:a.refetch}):a.isLoading||!g?(0,Z.jsx)(p,{className:`h-full`}):g.rows.length===0?(0,Z.jsx)(h,{className:`h-full`,title:`No heavy unlicensed users`,description:`Nobody without a licence was active on 11 or more days in ${B(s.month)}.`}):(0,Z.jsx)(u,{columns:v,data:g,defaultSort:[{columnId:`Active Days`,direction:`desc`}],theme:e,header:{title:`Most active without a licence`,subtitle:`The ${S(g.rows.length,`whole`)} unlicensed ${g.rows.length===1?`person`:`people`} active on the most days in ${B(s.month)}. The full ranked list is above, under Who to license next.`}})})]})}var ke=A({label:`Organization`,value:`Active Unlicensed Users`,of:`active unlicensed users`}),Ae=A({label:`Dormancy Bucket`,value:`Licensed Users`,of:`licensed users`});function je(e,t,n){let r=[{id:`Rank`,header:`Rank`,width:88,numericStyling:!0},{id:`User`,header:`User`,width:260},{id:`Organization`,header:e,minWidth:160},{id:`Priority Score`,header:`Priority score`,width:124,numericStyling:!0,cellRenderer:N({domain:P(t,`Priority Score`),format:F(t,`Priority Score`)})},{id:`Sessions Per Week`,header:`Sessions`,width:96,numericStyling:!0},{id:`Active Days Per Week`,header:`Active days`,width:116,numericStyling:!0}];return n&&r.push({id:`Workloads Per Day`,header:`Workloads per day`,width:156,numericStyling:!0}),r}function Me(){let{theme:e}=l(),t=f(),i=T(le()),s=T(re()),g=(0,X.useMemo)(()=>d(pe(),t),[t]),_=T({connection:g.connection,query:g.query,columnMetadata:g.columnMetadata}),C=se(),k=C.state===`ready`&&!C.concealed,A=(0,X.useMemo)(()=>d(k?ie():ae(),t),[k,t]),N=T({connection:A.connection,query:C.state===`loading`?``:A.query}),P=oe(),F=T(P),I=(0,X.useMemo)(()=>i.data?.status===`success`?a(i.data.table):void 0,[i.data]),L=(0,X.useMemo)(()=>s.data?.status===`success`?a(s.data.table):void 0,[s.data]),R=(0,X.useMemo)(()=>_.data?.status===`success`?E(_.data.table,g.columnMetadata):void 0,[_.data,g.columnMetadata]),z=(0,X.useMemo)(()=>N.data?.status===`success`?E(N.data.table,A.columnMetadata):void 0,[N.data,A.columnMetadata]),B=(0,X.useMemo)(()=>je(t.label,z,k),[t.label,z,k]),V=(0,X.useMemo)(()=>F.data?.status===`success`?E(F.data.table,P.columnMetadata):void 0,[F.data,P.columnMetadata]),H=(0,X.useMemo)(()=>R?ke(R):void 0,[R]),U=(0,X.useMemo)(()=>R?D(R,{label:`Organization`,by:`Active Unlicensed Users`}):void 0,[R]),W=(0,X.useMemo)(()=>V?Ae(V):void 0,[V]),G=i.data?.status===`error`?{message:i.data.error.message,retry:i.refetch}:s.data?.status===`error`?{message:s.data.error.message,retry:s.refetch}:void 0,K=i.isLoading||!i.data||s.isLoading||!s.data,q=n(L,`[License Evidence Notice]`),J=n(L,`[Reclaim Cost Notice]`),Y=r(L,`[License Inventory Usable]`)===0;return(0,Z.jsxs)(w,{id:o(`license-readiness`),title:`License readiness`,description:`Who is already reaching for Copilot without a license, and which licenses are sitting idle.`,children:[Y&&(0,Z.jsx)(`p`,{role:`status`,className:c(`text-[length:var(--text-200)] leading-200`,`max-w-[90ch] rounded-md bg-secondary px-300 py-200 text-foreground`),children:`Licenses don't match the people using Copilot, so everyone here counts as unlicensed and the list below may include people who already have a license. This is usually because Microsoft 365 reports hide user names: in the Microsoft 365 admin center, go to Settings > Org settings > Reports, untick "Display concealed user, group, and site names in all reports", then run the pipeline again.`}),G?(0,Z.jsx)(m,{message:G.message,onRetry:G.retry}):K?(0,Z.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-3`,children:[(0,Z.jsx)(p,{}),(0,Z.jsx)(p,{}),(0,Z.jsx)(p,{})]}):!I&&!L?(0,Z.jsx)(h,{title:`No license readiness data`,description:`The semantic model returned no rows for the current selection.`}):(0,Z.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-3`,children:[(0,Z.jsx)(x,{label:`Active unlicensed users`,value:r(I,`[Active Unlicensed Users]`),emphasis:!0,detail:(0,Z.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,Z.jsx)(y,{label:`Share of active users`,value:r(I,`[Unlicensed Share]`),format:`percent`}),(0,Z.jsx)(y,{label:`Median sessions/user/week`,value:r(I,`[Median Sessions Per User Per Week]`),format:`rate`})]})}),(0,Z.jsx)(x,{label:`Observed unlicensed use`,value:r(I,`[Observed Sessions Per User Per Week]`),format:`rate`,detail:`sessions per user per week, averaged across the active unlicensed population`}),(0,Z.jsx)(x,{label:`License estate`,value:r(L,`[Total Licensed Users]`),detail:(0,Z.jsx)(y,{label:`Avg days since last active`,value:r(L,`[Avg Days Since Last Active]`),format:`whole`})})]}),(0,Z.jsx)(te,{from:[s.notFilteredBy]}),(0,Z.jsx)(`div`,{className:`h-[340px]`,style:U?{height:b(U.table.rows.length,{perRow:40,chrome:100})+(H?40:0)}:void 0,children:_.data?.status===`error`?(0,Z.jsx)(m,{className:`h-full`,message:_.data.error.message,onRetry:_.refetch}):_.isLoading||!U?(0,Z.jsx)(p,{className:`h-full`}):U.table.rows.length===0?(0,Z.jsx)(h,{className:`h-full`,title:`No unlicensed demand by ${t.noun}`,description:`No ${t.noun} has active unlicensed Copilot use in the current selection.`}):(0,Z.jsx)(O,{text:H,children:(0,Z.jsx)(v,{label:`Priority by ${t.noun}`,spec:g.vegaLiteSpec,data:U.table,theme:e,header:{title:`Priority by ${t.noun}`,subtitle:ee(U,t.plural,`active unlicensed users`)??`Sessions per user per week among active unlicensed users`}})})}),(0,Z.jsx)(`div`,{className:`flex h-[560px] flex-col`,children:N.data?.status===`error`?(0,Z.jsx)(m,{className:`h-full`,message:N.data.error.message,onRetry:N.refetch}):N.isLoading||!z?(0,Z.jsx)(p,{className:`h-full`}):z.rows.length===0?(0,Z.jsx)(h,{className:`h-full`,title:`Nobody to license next`,description:`No active unlicensed users have enough observed activity to rank in the current selection.`}):(0,Z.jsx)(u,{columns:B,data:z,defaultSort:[{columnId:`Rank`,direction:`asc`}],theme:e,header:{title:`Who to license next`,subtitle:`${S(j(z),`whole`)} unlicensed users, ranked by priority score${k?`: how much they use Copilot, and how many Microsoft 365 workloads they use a day`:``}. Sessions and active days are per week.${Y?` Some may already have a license: see the note above.`:``}`}})}),z&&!N.isLoading&&N.data?.status===`success`&&(0,Z.jsx)(ne,{shown:z.rows.length,total:M(z),noun:`unlicensed users`,by:`by priority score`}),(0,Z.jsx)(`div`,{className:`h-[340px]`,style:V?{height:b(V.rows.length,{perRow:40,chrome:100})+(W?40:0)}:void 0,children:F.data?.status===`error`?(0,Z.jsx)(m,{className:`h-full`,message:F.data.error.message,onRetry:F.refetch}):F.isLoading||!V?(0,Z.jsx)(p,{className:`h-full`}):V.rows.length===0?(0,Z.jsx)(h,{className:`h-full`,title:Y?`Dormancy can't be measured yet`:`No license roster`,description:Y?`Licenses don't match the people using Copilot, so there's no way to tell which seats are idle. See the note at the top of this section.`:`The license inventory returned no dormancy buckets to show.`}):(0,Z.jsx)(O,{text:W,children:(0,Z.jsx)(v,{label:`Dormancy of the license estate`,spec:P.vegaLiteSpec,data:V,theme:e,header:{title:`Dormancy of the license estate`,subtitle:`Licensed users by last activity bucket`}})})}),(q||J)&&(0,Z.jsxs)(`div`,{className:`flex flex-col gap-200`,children:[q&&(0,Z.jsx)(`p`,{className:`max-w-[90ch] text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:q}),J&&(0,Z.jsx)(`p`,{className:`max-w-[90ch] text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:J})]})]})}function Ne(){let{show:e}=g();return(0,Z.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[e(`license-readiness`)&&(0,Z.jsx)(Me,{}),e(`habit-licence`)&&(0,Z.jsx)(Oe,{}),e(`cowork-readiness`)&&(0,Z.jsx)(Se,{})]})}export{Ne as ReadinessScreen};