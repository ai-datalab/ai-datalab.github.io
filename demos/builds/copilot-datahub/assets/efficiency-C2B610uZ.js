import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{t}from"./react-CQOZoUwg.js";import{n}from"./theme.context-Bdi5qD2o.js";import{t as r}from"./dist-CNsYZo9O.js";import{Ct as i,D as a,E as o,M as s,N as c,ct as l,f as u,h as d,it as f,k as p,l as m,m as h,nt as g,ot as _,pt as v,wt as y}from"./utils-CCoPj5LP.js";import{t as b}from"./arrow-right-BBcFQ-OZ.js";import{c as x,i as S}from"./grading-method-CtfJkuJ7.js";import{E as C,T as w,w as T}from"./task-times.context-BBcn0_iQ.js";import{i as E}from"./stage-filter.context-DYufJONF.js";import{i as ee,m as D,n as te}from"./root-gWGWd7kV.js";import{a as O,i as k,o as A,t as j}from"./kpi-card-CepzBQ5w.js";import{t as ne}from"./filter-note-Dye7epH9.js";import{t as M}from"./format-kpi-BhveZiQQ.js";import{t as re}from"./on-demand-B1wIfLh0.js";import{t as ie}from"./section-p8LJFb5N.js";import{t as N}from"./use-filtered-query-Cijb7JFT.js";import{t as P}from"./to-data-table-DHzdyPpP.js";import{n as ae,r as oe}from"./color-scale-DTyjSAgS.js";import{t as F}from"./headlined-DjGAlKEw.js";import{i as I,n as L,o as R,t as z}from"./headline-CtXokBCs.js";import{t as B}from"./page-panel-gate-Nl3a8ZXs.js";import{a as V,c as se,d as ce,i as H,l as U,n as le,o as ue,r as W,s as de,t as fe,u as pe}from"./tree-grid-DM4gP5Lp.js";import{i as me,r as he,t as ge}from"./list-total-CX25JPMl.js";import{a as G,i as _e}from"./heat-CbpN8wu2.js";import{n as ve,t as K}from"./grade-mark-CHTtACXs.js";import"./agents-B9kVbckY.js";var ye={name:`flag`,size:24,node:[[`path`,{d:`M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528`,key:`1jaruq`}]]};ye.node;var be=i(ye),q=e(t(),1),xe=/\s{3,}/,Se=/^([A-Za-z][A-Za-z ]*?)\s*·\s*(.+)$/;function Ce(e){return x(e)??x(`${e} fit`)}function we(e){let t=[],n=[];for(let r of(e??``).split(xe)){let e=r.trim();if(!e)continue;let i=Se.exec(e),a=i?Ce(i[1]):void 0;i&&a?t.push({grade:a,rule:i[2].replace(/\.$/,``)}):n.push(e)}return{grades:t,notes:n}}var Te=`EVALUATE\r
ROW(\r
    "Cowork Sessions", [Usage Efficiency: Consumption Sessions],\r
    "Tasks Completed", [Usage Efficiency: Consumption Tasks],\r
    "Active Days Per User", [Usage Efficiency: Active Days Per User],\r
    "Expert Hours", [Cowork Hours (Task Category Basis)],\r
    "Strong Fit Share", [Usage Efficiency: High Fit Share],\r
    "Worth A Look Share", [Usage Efficiency: Low Fit Share],\r
    "Fit Notice", [Usage Efficiency: Fit Rule Notice]\r
)\r
`,Ee={"[Cowork Sessions]":{name:`Cowork Sessions`,displayName:`Cowork sessions`,format:`#,0`},"[Tasks Completed]":{name:`Tasks Completed`,displayName:`Tasks completed`,format:`#,0`},"[Active Days Per User]":{name:`Active Days Per User`,displayName:`Active days per user`,format:u},"[Expert Hours]":{name:`Expert Hours`,displayName:`Expert equivalent hours`,format:u},"[Strong Fit Share]":{name:`Strong Fit Share`,displayName:`Strong fit`,format:h},"[Worth A Look Share]":{name:`Worth A Look Share`,displayName:`Worth a look`,format:h},"[Fit Notice]":{name:`Fit Notice`,displayName:`Fit notice`}};function De(){return{connection:`vl`,query:Te,columnMetadata:Ee}}var Oe=`EVALUATE\r
ROW(\r
    "Sessions", [Model: Sessions],\r
    "Logged Share", [Model: Logged Session Share],\r
    "Well-matched Share", [Model: Well-matched Share],\r
    "Over-specified Share", [Model: Over-specified Share],\r
    "Under-specified Share", [Model: Under-specified Share],\r
    "Coverage Notice", [Model: Coverage Notice]\r
)\r
`,ke={"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Logged Share]":{name:`Logged Share`,displayName:`Model logged`,format:h},"[Well-matched Share]":{name:`Well-matched Share`,displayName:`Good match`,format:h},"[Over-specified Share]":{name:`Over-specified Share`,displayName:`Lighter model may do`,format:h},"[Under-specified Share]":{name:`Under-specified Share`,displayName:`Try stronger`,format:h},"[Coverage Notice]":{name:`Coverage Notice`,displayName:`Coverage notice`}};function Ae(){return{connection:`vl`,query:Oe,columnMetadata:ke}}var je=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Interactions (Audit Logs)'[AI_Model],\r
            'Chat + Agent Interactions (Audit Logs)'[Model Cost Tier],\r
            'Chat + Agent Interactions (Audit Logs)'[Model Cost Tier Sort],\r
            "@Sessions", [Model: Sessions],\r
            "@UsageShare", [Model: Usage Share]\r
        ),\r
        NOT ISBLANK([@Sessions])\r
    ),\r
    "Model",\r
        VAR _model = 'Chat + Agent Interactions (Audit Logs)'[AI_Model]\r
        RETURN IF(ISBLANK(_model) || TRIM(_model) = "", "Model not logged", _model),\r
    "Cost Tier", COALESCE('Chat + Agent Interactions (Audit Logs)'[Model Cost Tier], "Not attributed"),\r
    "Tier Sort", 'Chat + Agent Interactions (Audit Logs)'[Model Cost Tier Sort],\r
    "Sessions", [@Sessions],\r
    "Usage Share", [@UsageShare]\r
)\r
ORDER BY [Sessions] DESC, [Model] ASC\r
`,Me={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Model`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:240}},x:{field:`Sessions`,type:`quantitative`,title:`Sessions`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}},color:{field:`Cost Tier`,type:`nominal`,title:`Cost tier`,sort:{field:`Tier Sort`,order:`ascending`},legend:{labelLimit:240}},tooltip:[{field:`Model`,type:`nominal`,title:`Model`},{field:`Cost Tier`,type:`nominal`,title:`Cost tier`},{field:`Sessions`,type:`quantitative`,title:`Sessions`,format:`,.0f`},{field:`Usage Share`,type:`quantitative`,title:`Share`,format:`.1%`}]}},Ne={"[Model]":{name:`Model`,displayName:`Model`},"[Cost Tier]":{name:`Cost Tier`,displayName:`Cost tier`},"[Tier Sort]":{name:`Tier Sort`,displayName:`Tier sort`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Usage Share]":{name:`Usage Share`,displayName:`Share`,format:h}};function Pe(){return{connection:`vl`,query:je,columnMetadata:Ne,vegaLiteSpec:Me}}var Fe=`EVALUATE\r
VAR _well =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
                "@Sessions", [Model: Well-matched Sessions],\r
                "@Total", [Model: Sessions]\r
            ),\r
            [@Sessions] > 0\r
        ),\r
        "Activity", 'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
        "Outcome", "Good match",\r
        "Outcome Order", 1,\r
        "Sessions", [@Sessions],\r
        "Share", DIVIDE([@Sessions], [@Total])\r
    )\r
VAR _over =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
                "@Sessions", [Model: Over-specified Sessions],\r
                "@Total", [Model: Sessions]\r
            ),\r
            [@Sessions] > 0\r
        ),\r
        "Activity", 'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
        "Outcome", "Lighter model may do",\r
        "Outcome Order", 2,\r
        "Sessions", [@Sessions],\r
        "Share", DIVIDE([@Sessions], [@Total])\r
    )\r
VAR _under =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
                "@Sessions", [Model: Under-specified Sessions],\r
                "@Total", [Model: Sessions]\r
            ),\r
            [@Sessions] > 0\r
        ),\r
        "Activity", 'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
        "Outcome", "Try stronger",\r
        "Outcome Order", 3,\r
        "Sessions", [@Sessions],\r
        "Share", DIVIDE([@Sessions], [@Total])\r
    )\r
VAR _notJudged =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
                "@Sessions", [Model: Not Judged Sessions],\r
                "@Total", [Model: Sessions]\r
            ),\r
            [@Sessions] > 0\r
        ),\r
        "Activity", 'Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)],\r
        "Outcome", "Not judged",\r
        "Outcome Order", 4,\r
        "Sessions", [@Sessions],\r
        "Share", DIVIDE([@Sessions], [@Total])\r
    )\r
RETURN\r
    UNION(_well, _over, _under, _notJudged)\r
ORDER BY [Activity], [Outcome Order]\r
`,Ie={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},encoding:{y:{field:`Activity`,type:`nominal`,title:null,sort:`ascending`,axis:{labelLimit:200}},x:{field:`Share`,type:`quantitative`,stack:`zero`,title:`Share of sessions`,scale:{domain:[0,1]},axis:{labelExpr:`format(datum.value, '.0%')`}},color:{field:`Outcome`,type:`nominal`,title:`Outcome`,scale:{domain:[`Good match`,`Lighter model may do`,`Try stronger`,`Not judged`]}},order:{field:`Outcome Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Activity`,type:`nominal`,title:`Activity`},{field:`Outcome`,type:`nominal`,title:`Outcome`},{field:`Sessions`,type:`quantitative`,title:`Sessions`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share`,format:`.1%`}]}},Le={"[Activity]":{name:`Activity`,displayName:`Activity`},"[Outcome]":{name:`Outcome`,displayName:`Outcome`},"[Outcome Order]":{name:`Outcome Order`,displayName:`Outcome order`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Share]":{name:`Share`,displayName:`Share`,format:h}};function Re(){return{connection:`vl`,query:Fe,columnMetadata:Le,vegaLiteSpec:Ie}}var ze=`EVALUATE\r
TOPN(\r
    25,\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                __GROUPING_COLUMN__,\r
                "@Sessions", [Model: Sessions],\r
                "@Judged", [Model: Judged Sessions],\r
                "@Well", [Model: Well-matched Sessions],\r
                "@Over", [Model: Over-specified Sessions],\r
                "@Under", [Model: Under-specified Sessions],\r
                "@JudgedShare", [Model: Judged Share],\r
                "@WellShare", [Model: Well-matched Share],\r
                "@OverShare", [Model: Over-specified Share],\r
                "@UnderShare", [Model: Under-specified Share],\r
                "@MainModel", [Model: Main Model],\r
                "@MainReason", [Model: Main Reason]\r
            ),\r
            NOT ISBLANK([@Sessions])\r
        ),\r
        "Segment", COALESCE(__GROUPING_COLUMN__, "__BLANK_LABEL__"),\r
        "Main Model", [@MainModel],\r
        "Main Reason", [@MainReason],\r
        "Sessions", [@Sessions],\r
        "Judged Sessions", [@Judged],\r
        "Well-matched Sessions", [@Well],\r
        "Over-specified Sessions", [@Over],\r
        "Under-specified Sessions", [@Under],\r
        "Judged Share", [@JudgedShare],\r
        "Well-matched Share", [@WellShare],\r
        "Over-specified Share", [@OverShare],\r
        "Under-specified Share", [@UnderShare]\r
    ),\r
    [Sessions], DESC,\r
    [Segment], ASC\r
)\r
ORDER BY [Sessions] DESC, [Segment] ASC\r
`,Be={"[Segment]":{name:`Segment`,displayName:`Segment`},"[Main Model]":{name:`Main Model`,displayName:`Main model`},"[Main Reason]":{name:`Main Reason`,displayName:`Main reason`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Judged Sessions]":{name:`Judged Sessions`,displayName:`Judged sessions`,format:`#,0`},"[Well-matched Sessions]":{name:`Well-matched Sessions`,displayName:`Good match`,format:`#,0`},"[Over-specified Sessions]":{name:`Over-specified Sessions`,displayName:`Lighter model may do`,format:`#,0`},"[Under-specified Sessions]":{name:`Under-specified Sessions`,displayName:`Try stronger`,format:`#,0`},"[Judged Share]":{name:`Judged Share`,displayName:`Judged`,format:h},"[Well-matched Share]":{name:`Well-matched Share`,displayName:`Good match`,format:h},"[Over-specified Share]":{name:`Over-specified Share`,displayName:`Lighter model may do`,format:h},"[Under-specified Share]":{name:`Under-specified Share`,displayName:`Try stronger`,format:h}};function J(e){return typeof e==`number`&&Number.isFinite(e)?e:0}function Ve({judgedSessions:e,overSpecifiedSessions:t,underSpecifiedSessions:n}){let r=J(e);if(r<5)return`Not judged`;let i=J(t),a=J(n),o=r-i-a;return o>=i&&o>=a?`Good match`:i>=a?`Lighter model may do`:`Try stronger`}function Y(e,t){return{connection:`vl`,query:ze.replace(/__GROUPING_COLUMN__|__BLANK_LABEL__/g,n=>n===`__GROUPING_COLUMN__`?e:t.replaceAll(`"`,`""`)),columnMetadata:Be}}function He(){return Y(`'Chat + Agent Interactions (Audit Logs)'[Task Breakdown Group]`,`Unclassified task`)}function Ue(e=_(f)){return v(Y(l(f),`Unassigned ${e.noun}`),e)}function We(){return Y(`'Chat + Agent Interactions (Audit Logs)'[Audit_UserId]`,`Unattributed user`)}var Ge=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Chat + Agent Interactions (Audit Logs)'[Cowork Task Category],\r
            'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade],\r
            'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort],\r
            "@Share", [Usage Efficiency: Task Grade Share],\r
            "@Sessions", [Usage Efficiency: Graded Tasks],\r
            "@TaskSessions",\r
                CALCULATE(\r
                    [Usage Efficiency: Graded Tasks],\r
                    REMOVEFILTERS(\r
                        'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade],\r
                        'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort]\r
                    )\r
                )\r
        ),\r
        NOT ISBLANK([@Share])\r
            && NOT ISBLANK('Chat + Agent Interactions (Audit Logs)'[Cowork Task Category])\r
    ),\r
    "Task", 'Chat + Agent Interactions (Audit Logs)'[Cowork Task Category],\r
    "Grade", 'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade],\r
    "Grade Order", 'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort],\r
    "Share", [@Share],\r
    "Sessions", [@Sessions],\r
    "Task Sessions", [@TaskSessions]\r
)\r
ORDER BY [Task Sessions] DESC, [Task] ASC, [Grade Order] ASC\r
`,Ke={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},encoding:{y:{field:`Task`,type:`nominal`,title:null,sort:{field:`Task Sessions`,op:`max`,order:`descending`},axis:{labelLimit:200}},x:{field:`Share`,type:`quantitative`,stack:`zero`,title:`Share of the task`,scale:{domain:[0,1]},axis:{labelExpr:`format(datum.value, '.0%')`}},color:{field:`Grade`,type:`nominal`,title:`Fit`,scale:{domain:[`Strong fit`,`Fair fit`,`Worth a look`]}},order:{field:`Grade Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Task`,type:`nominal`,title:`Task Breakdown`},{field:`Grade`,type:`nominal`,title:`Fit`},{field:`Share`,type:`quantitative`,title:`Share of the task`,format:`.0%`},{field:`Sessions`,type:`quantitative`,title:`Graded sessions`,format:`,.0f`}]}},qe=[`Strong fit`,`Fair fit`,`Worth a look`],Je={"[Task]":{name:`Task`,displayName:`Task Breakdown`},"[Grade]":{name:`Grade`,displayName:`Fit`},"[Grade Order]":{name:`Grade Order`,displayName:`Fit order`,format:`#,0`},"[Share]":{name:`Share`,displayName:`Share of the task`,format:h},"[Sessions]":{name:`Sessions`,displayName:`Graded sessions`,format:`#,0`},"[Task Sessions]":{name:`Task Sessions`,displayName:`Graded sessions in the task`,format:`#,0`}};function Ye(){return{connection:`vl`,query:Ge,columnMetadata:Je,vegaLiteSpec:Ke}}function Xe(e){let t=e.columns.findIndex(e=>e.name===`Grade`),n=e.columns.findIndex(e=>e.name===`Grade Order`);return t<0?e:{...e,rows:e.rows.map(e=>{let r=[...e];return r[t]=x(e[t],n>=0?e[n]:void 0)?.name??e[t],r})}}var Ze=`EVALUATE\r
SUMMARIZECOLUMNS(\r
    ROLLUPADDISSUBTOTAL(\r
        ROLLUPGROUP(\r
            'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade],\r
            'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort]\r
        ), "Is Grand Total",\r
        ROLLUPGROUP(\r
            'Chat + Agent Interactions (Audit Logs)'[Work Shape],\r
            'Chat + Agent Interactions (Audit Logs)'[Work Shape Sort]\r
        ), "Is Group Total"\r
    ),\r
    "Sessions", [Usage Efficiency: Consumption Sessions],\r
    "Decided By", [Usage Efficiency: Fit Basis],\r
    "Could Have Used", [Usage Efficiency: Alternative Tool],\r
    "Share Of Work", [Usage Efficiency: Share Of Work],\r
    "Source Items", [Usage Efficiency: Evidence Files],\r
    "Source Types", [Usage Efficiency: Evidence Kinds]\r
)\r
ORDER BY\r
    [Is Grand Total] DESC,\r
    'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort] ASC,\r
    [Is Group Total] DESC,\r
    'Chat + Agent Interactions (Audit Logs)'[Work Shape Sort] ASC\r
`,Qe=`Chat + Agent Interactions (Audit Logs)Work Weight Grade`,$e=`Chat + Agent Interactions (Audit Logs)Work Weight Grade Sort`,et=`Chat + Agent Interactions (Audit Logs)Work Shape`,tt=`Chat + Agent Interactions (Audit Logs)Work Shape Sort`,X=`Work`,nt=[`Sessions`,`Decided By`,`Could Have Used`,`Share Of Work`,`Source Items`,`Source Types`],rt={"Chat + Agent Interactions (Audit Logs)[Work Weight Grade]":{name:Qe,displayName:`Grade`},"Chat + Agent Interactions (Audit Logs)[Work Weight Grade Sort]":{name:$e},"Chat + Agent Interactions (Audit Logs)[Work Shape]":{name:et,displayName:`How it was done`},"Chat + Agent Interactions (Audit Logs)[Work Shape Sort]":{name:tt},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Decided By]":{name:`Decided By`,displayName:`Decided by`},"[Could Have Used]":{name:`Could Have Used`,displayName:`Could have used`},"[Share Of Work]":{name:`Share Of Work`,displayName:`% of work`,format:h},"[Source Items]":{name:`Source Items`,displayName:`Source items`,format:u},"[Source Types]":{name:`Source Types`,displayName:`Source types`,format:u}};function it(){return{connection:`vl`,query:Ze,columnMetadata:rt}}function at(e){return pe(e,{group:Qe,leaf:et,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:X,fields:nt,groupLabel:(e,t)=>x(e,t($e))?.name})}var ot=`DEFINE\r
    // The report's Who Flag, as a count: people with half or more of their\r
    // graded Cowork sessions at Worth a look. Defined here so models built\r
    // before that measure was added still answer.\r
    MEASURE 'Chat + Agent Interactions (Audit Logs)'[ValueLens Cowork Flagged People] =\r
        VAR _people =\r
            CALCULATETABLE(\r
                VALUES('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
                REMOVEFILTERS(\r
                    'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade],\r
                    'Chat + Agent Interactions (Audit Logs)'[Work Weight Grade Sort]\r
                ),\r
                KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Agent Filter (Normalized)] = "Cowork")\r
            )\r
        RETURN\r
            COUNTROWS(FILTER(_people, [Usage Efficiency: Who Low Share] >= 0.5))\r
\r
EVALUATE\r
// Every group row is kept, so the totals stay whole; the people under them\r
// stop at the top 1,000, and "Total" counts them all.\r
VAR _all =\r
    SUMMARIZECOLUMNS(\r
        ROLLUPADDISSUBTOTAL(\r
            'Chat + Agent Org Data'[Organization], "Is Grand Total",\r
            'Chat + Agent Interactions (Audit Logs)'[Audit_UserId], "Is Group Total"\r
        ),\r
        "People", [Usage Efficiency: Who People],\r
        "Sessions", [Usage Efficiency: Who Graded Sessions],\r
        "Strong", [Usage Efficiency: Who High Share],\r
        "Fair", [Usage Efficiency: Who Medium Share],\r
        "Worth A Look", [Usage Efficiency: Who Low Share],\r
        "Flagged People", [ValueLens Cowork Flagged People]\r
    )\r
VAR _people = FILTER(_all, NOT [Is Group Total])\r
VAR _total = COUNTROWS(_people) + 0\r
RETURN\r
ADDCOLUMNS(\r
    UNION(\r
        FILTER(_all, [Is Group Total]),\r
        TOPN(\r
            1000,\r
            _people,\r
            [Sessions], DESC,\r
            'Chat + Agent Interactions (Audit Logs)'[Audit_UserId], ASC,\r
            'Chat + Agent Org Data'[Organization], ASC\r
        )\r
    ),\r
    "Total", _total\r
)\r
ORDER BY\r
    [Is Grand Total] DESC,\r
    'Chat + Agent Org Data'[Organization] ASC,\r
    [Is Group Total] DESC,\r
    [Sessions] DESC,\r
    'Chat + Agent Interactions (Audit Logs)'[Audit_UserId] ASC\r
`,st=`Chat + Agent Org DataOrganization`,ct=`Chat + Agent Interactions (Audit Logs)Audit_UserId`,lt=[`People`,`Sessions`,`Strong`,`Fair`,`Worth A Look`,`Flagged People`],ut={"Chat + Agent Org Data[Organization]":{name:st,displayName:`Organization`},"Chat + Agent Interactions (Audit Logs)[Audit_UserId]":{name:ct,displayName:`Person`},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Graded sessions`,format:`#,0`},"[Strong]":{name:`Strong`,displayName:`Strong`,format:h},"[Fair]":{name:`Fair`,displayName:`Fair`,format:h},"[Worth A Look]":{name:`Worth A Look`,displayName:`Worth a look`,format:h},"[Flagged People]":{name:`Flagged People`,displayName:`Flagged`,format:`#,0`},...d};function dt(e=_(f)){return v({connection:`vl`,query:ot,columnMetadata:ut},e)}function ft(e,t){return pe(e,{group:st,leaf:ct,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:`Who`,fields:lt,blankLabel:t})}var Z=y(),pt={min:0,max:1},mt=[{id:X},{id:`Sessions`,format:W(`whole`)},{id:`Decided By`},{id:`Could Have Used`},{id:`Share Of Work`,format:W(`percent`)},{id:`Source Items`,format:W(`decimal`)},{id:`Source Types`,format:W(`decimal`)}];function ht({ignore:e}){let{theme:t}=n(),i=it(),a=N({connection:i.connection,query:i.query,columnMetadata:i.columnMetadata},{ignore:e}),o=(0,q.useMemo)(()=>a.data?.status===`success`?at(P(a.data.table,i.columnMetadata)):void 0,[a.data,i.columnMetadata]),s=o?.rows.map(e=>e._id).join(`|`)??``,c=(0,q.useMemo)(()=>ue(o,!0),[o]),{ids:l,onRowToggle:u}=de(s),d=(0,q.useMemo)(()=>{let e=o?.rows??[],t=e.flatMap(e=>e._children??[]);return{group:_e(e.map(e=>e[`Share Of Work`])),leaf:_e(t.map(e=>e[`Share Of Work`]))}},[o]),f=(0,q.useMemo)(()=>[{id:X,header:`Grade / how it was done`,width:184,cellRenderer:(e,t)=>{if(!U(t))return H(e);let n=x(e);return(0,Z.jsxs)(`span`,{className:`inline-flex items-center gap-200 font-semibold`,children:[n&&(0,Z.jsx)(K,{tone:n.tone}),H(e)]})}},{id:`Sessions`,header:`Sessions`,width:96,numericStyling:!0,cellRenderer:W(`whole`)},{id:`Decided By`,header:`Decided by`,minWidth:240},{id:`Could Have Used`,header:`Could have used`,width:168},{id:`Share Of Work`,header:`% of work`,width:108,numericStyling:!0,cellRenderer:G({domain:e=>U(e)?d.group:d.leaf,format:W(`percent`)})},{id:`Source Items`,header:`Source items`,width:120,numericStyling:!0,cellRenderer:W(`decimal`)},{id:`Source Types`,header:`Source types`,width:120,numericStyling:!0,cellRenderer:W(`decimal`)}],[d]),p=(0,q.useMemo)(()=>V(o?.total,mt),[o]),m=ce(c??[],e=>!l.has(e._id));return(0,Z.jsx)(se,{tree:o,error:a.data?.status===`error`?a.data.error.message:void 0,onRetry:a.refetch,isLoading:a.isLoading,height:o?O(m+ +!!p,fe):void 0,emptyTitle:`No graded Cowork work`,emptyDescription:`No Cowork session in this selection carries enough detail to say how the work was done.`,children:(0,Z.jsx)(r,{columns:f,data:c,grandTotals:p?{position:`bottom`,data:p}:void 0,onRowToggle:u,theme:t,header:{title:`How the work was done`,subtitle:`Each grade, then the shapes of work inside it. Sources are the median per session.`}},s)})}function gt(e,t){let n=le(e);if(!n)return null;let r=U(t);return(0,Z.jsxs)(`span`,{className:`inline-flex items-center gap-100 font-semibold text-caution`,children:[(0,Z.jsx)(be,{className:`icon-size-100`,strokeWidth:2.5,"aria-hidden":`true`}),r?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`span`,{className:`tabular-nums`,children:M(n,`whole`)}),(0,Z.jsx)(`span`,{className:`sr-only`,children:n===1?`person flagged`:`people flagged`})]}):(0,Z.jsx)(`span`,{className:`sr-only`,children:`Flagged`})]})}function _t({ignore:e}){let{theme:t}=n(),i=c(),a=D(),o=(0,q.useMemo)(()=>dt(i),[i]),s=N({connection:o.connection,query:o.query,columnMetadata:o.columnMetadata},{ignore:e}),l=`Unassigned ${i.noun}`,u=(0,q.useMemo)(()=>s.data?.status===`success`?P(s.data.table,o.columnMetadata):void 0,[s.data,o.columnMetadata]),d=(0,q.useMemo)(()=>u?ft(u,l):void 0,[u,l]),f=`${i.column}|${d?.rows.map(e=>e._id).join(`|`)??``}`,p=(0,q.useMemo)(()=>ue(d,!1),[d]),{ids:m,onRowToggle:h}=de(f),g=(0,q.useMemo)(()=>[{id:`Who`,header:`${i.label} / person`,minWidth:240,cellRenderer:(e,t)=>U(t)?(0,Z.jsx)(`span`,{className:`font-semibold`,children:H(e)}):H(e)},{id:`People`,header:`People`,width:88,numericStyling:!0,cellRenderer:(e,t)=>U(t)?W(`whole`)(e):null},{id:`Sessions`,header:`Graded sessions`,width:140,numericStyling:!0,cellRenderer:W(`whole`)},{id:`Mix`,header:`Mix`,width:104,sortable:!1,cellRenderer:(e,t)=>(0,Z.jsx)(ve,{strong:t.Strong,fair:t.Fair,worth:t[`Worth A Look`]})},{id:`Strong`,header:`Strong`,width:96,numericStyling:!0,cellRenderer:W(`percent`)},{id:`Fair`,header:`Fair`,width:96,numericStyling:!0,cellRenderer:W(`percent`)},{id:`Worth A Look`,header:`Worth a look`,width:124,numericStyling:!0,cellRenderer:G({domain:pt,format:W(`percent`),color:a?.caution})},{id:`Flagged People`,header:`Flag`,width:88,cellRenderer:gt}],[i.label,a]),_=(0,q.useMemo)(()=>V(d?.total,[{id:`Who`},{id:`People`,format:W(`whole`)},{id:`Sessions`,format:W(`whole`)},{id:`Mix`},{id:`Strong`,format:W(`percent`)},{id:`Fair`,format:W(`percent`)},{id:`Worth A Look`,format:W(`percent`)},{id:`Flagged People`,format:W(`whole`)}]),[d]),v=ce(p??[],e=>m.has(e._id));return(0,Z.jsxs)(`div`,{className:`flex flex-col gap-200`,children:[(0,Z.jsx)(se,{tree:d,error:s.data?.status===`error`?s.data.error.message:void 0,onRetry:s.refetch,isLoading:s.isLoading,height:d?O(v+ +!!_,fe):void 0,emptyTitle:`Nobody with enough graded sessions`,emptyDescription:`A person or ${i.noun} appears here once they have five graded Cowork sessions in this selection.`,children:(0,Z.jsx)(r,{columns:g,data:p,defaultSort:[{columnId:`Sessions`,direction:`desc`}],grandTotals:_?{position:`bottom`,data:_}:void 0,onRowToggle:h,theme:t,header:{title:`Who is doing it`,subtitle:`Each ${i.noun}, then its people. Shares are of graded sessions; a flag marks half or more at Worth a look.`}},f)}),u&&(0,Z.jsx)(me,{shown:ge(u),total:he(u),noun:`person rows`,by:`by graded sessions`,rollup:!0})]})}var vt=L({label:`Task`,value:`Sessions`,of:`graded sessions`}),yt=L({label:`Model`,value:`Sessions`,of:`sessions with a logged model`}),bt=`Good match`,xt=z(e=>{let t=R(e,`Activity`,`Sessions`),n=e.columns.findIndex(e=>e.name===`Outcome`),r=e.columns.findIndex(e=>e.name===`Activity`),i=e.columns.findIndex(e=>e.name===`Sessions`);if(n<0||r<0||i<0)return;let a=new Map;for(let t of e.rows){let e=t[i];if(t[n]!==bt||typeof e!=`number`||!Number.isFinite(e))continue;let o=String(t[r]);a.set(o,(a.get(o)??0)+e)}let o=[...t].filter(([,e])=>e>=5).map(([e,t])=>({activity:e,total:t,good:a.get(e)??0}));if(o.length<2||o.some(e=>e.good<0))return;o.sort((e,t)=>t.good/t.total-e.good/e.total);let s=o[0],c=o[o.length-1],l=I(s.good,s.total);if(s.good<=0||l===I(o[1].good,o[1].total))return;let u=I(c.good,c.total);return`Good matches make up ${l} of ${s.activity} sessions, against ${u} of ${c.activity} sessions. A comparison, not a cause.`},L({label:`Outcome`,value:`Sessions`,of:`sessions`})),Q=[`audience`,`agentTypes`,`agentNames`],St={perRow:44,chrome:190},Ct={disableStackedDataLabels:!0},wt=`text-[length:var(--text-200)] leading-200`,Tt=`text-[length:var(--text-300)] leading-300`;function Et(e){let t=o(e,`[Strong Fit Share]`),n=o(e,`[Worth A Look Share]`),r=t!==void 0||n!==void 0;return{strong:t??(r?0:void 0),worth:n??(r?0:void 0)}}function Dt(e){return new Set(e).size}function Ot(){let{theme:e}=n(),t=D(),r=Ye(),i=N({connection:r.connection,query:r.query,columnMetadata:r.columnMetadata},{ignore:Q}),a=(0,q.useMemo)(()=>i.data?.status===`success`?Xe(P(i.data.table,r.columnMetadata)):void 0,[i.data,r.columnMetadata]),o=(0,q.useMemo)(()=>{let n=ae(t,e);return oe(r.vegaLiteSpec,qe,[n.positive,n.neutral,n.caution])},[r.vegaLiteSpec,t,e]),s=a?.columns.findIndex(e=>e.name===`Task`)??-1,c=a&&s>=0?Dt(a.rows.map(e=>e[s])):0,l=(0,q.useMemo)(()=>a?vt(a):void 0,[a]);return(0,Z.jsx)(`div`,{className:`h-[400px]`,style:a?{height:A(c,St)+(l?40:0)}:void 0,children:i.data?.status===`error`?(0,Z.jsx)(w,{className:`h-full`,message:i.data.error.message,onRetry:i.refetch}):i.isLoading||!a?(0,Z.jsx)(C,{className:`h-full`}):a.rows.length===0?(0,Z.jsx)(T,{className:`h-full`,title:`No tasks to grade`,description:`No graded Cowork session in this selection carries a Task Breakdown.`}):(0,Z.jsx)(F,{text:l,children:(0,Z.jsx)(k,{label:`What goes to Cowork`,spec:o,data:a,theme:e,capabilities:Ct,header:{title:`What goes to Cowork`,subtitle:`Graded sessions for each Task Breakdown, by fit. Busiest first.`}})})})}function kt({notice:e}){let t=(0,q.useId)(),{grades:n,notes:r}=(0,q.useMemo)(()=>we(e),[e]),i=te(`appendix`,`grading-method`);return(0,Z.jsxs)(`article`,{"aria-labelledby":t,className:`flex flex-col rounded-xl border border-border bg-card`,children:[(0,Z.jsx)(`h3`,{id:t,className:`border-b border-border px-500 py-400 text-[length:var(--text-400)] leading-400 font-semibold text-foreground`,children:`How sessions are graded`}),n.length>0&&(0,Z.jsx)(`dl`,{className:`flex flex-col divide-y divide-border px-500`,children:n.map(({grade:e,rule:t})=>(0,Z.jsxs)(`div`,{className:`flex flex-col gap-100 py-300`,children:[(0,Z.jsxs)(`dt`,{className:`flex items-center gap-200 ${Tt} font-semibold text-foreground`,children:[(0,Z.jsx)(K,{tone:e.tone}),e.name]}),(0,Z.jsx)(`dd`,{className:`${Tt} text-muted-foreground first-letter:uppercase`,children:t})]},e.name))}),(0,Z.jsxs)(`div`,{className:`mt-auto flex flex-col gap-200 border-t border-border px-500 py-300`,children:[r.map(e=>(0,Z.jsx)(`p`,{className:`${wt} max-w-[68ch] text-muted-foreground`,children:e},e)),(0,Z.jsxs)(`button`,{type:`button`,onClick:i,className:`inline-flex w-fit items-center gap-100 ${wt} font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`,children:[`How grading works, and the research behind it`,(0,Z.jsx)(b,{className:`icon-size-100`,"aria-hidden":`true`})]})]})]})}function At(){let{filters:e,applicable:t}=s(),n=c(),r=N(De(),{ignore:Q}),i=g(e,t),l=(0,q.useMemo)(()=>r.data?.status===`success`?p(r.data.table):void 0,[r.data]),u=o(l,`[Cowork Sessions]`),d=a(l,`[Fit Notice]`),f=Et(l);return(0,Z.jsxs)(ie,{id:m(`cowork-fit`),title:`Cowork fit`,description:`Whether the work people hand to Cowork suits it, judged by the apps and sources each session touched.`,children:[(0,Z.jsx)(ne,{ignored:Q,reason:`Cowork fit always reads every Cowork session.`}),i?(0,Z.jsx)(T,{title:`No Cowork sessions for unlicensed people`,description:`Cowork needs a Copilot license, so unlicensed people have no Cowork sessions to grade. Set License to All or Licensed.`}):r.data?.status===`error`?(0,Z.jsx)(w,{message:r.data.error.message,onRetry:r.refetch}):r.isLoading||!r.data?(0,Z.jsx)(`div`,{className:`grid gap-300 md:grid-cols-3 xl:grid-cols-6`,children:Array.from({length:6},(e,t)=>(0,Z.jsx)(C,{},t))}):u===void 0?(0,Z.jsx)(T,{title:`No Cowork activity to grade yet`,description:`${d?`${d} `:``}Cowork sessions are graded here as soon as the audit log records them.`}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-3 xl:grid-cols-6`,children:[(0,Z.jsx)(j,{label:`Cowork sessions`,value:u,emphasis:!0}),(0,Z.jsx)(j,{label:`Tasks completed`,value:o(l,`[Tasks Completed]`)}),(0,Z.jsx)(j,{label:`Active days per user`,value:o(l,`[Active Days Per User]`),format:`hours`}),(0,Z.jsx)(j,{label:`Expert equivalent hours`,value:o(l,`[Expert Hours]`),format:`hours`}),(0,Z.jsx)(j,{label:`Strong fit`,value:f.strong,format:`percent`,detail:`Share of graded sessions`}),(0,Z.jsx)(j,{label:`Worth a look`,value:f.worth,format:`percent`,detail:`Share of graded sessions`})]}),(0,Z.jsxs)(`div`,{className:`grid grid-cols-1 items-start gap-500 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]`,children:[(0,Z.jsx)(Ot,{}),(0,Z.jsx)(kt,{notice:d})]}),(0,Z.jsx)(ht,{ignore:Q}),(0,Z.jsx)(re,{id:`cowork-fit-people`,label:`Show by ${n.noun} and person`,note:`Graded sessions and the fit mix for each ${n.noun}, opening to its people.`,children:(0,Z.jsx)(_t,{ignore:Q})})]})]})}function jt(e){return[{id:`task`,label:`Task Category`},{id:`organization`,label:e},{id:`person`,label:`User`}]}var Mt=[`audience`],Nt=[`Good match`,`Lighter model may do`,`Try stronger`,`Not judged`],Pt={min:0,max:1};function Ft(e,t,n){let r=t.columns.findIndex(e=>e.name===n);if(r<0)return;let i=e[r];return typeof i==`number`&&Number.isFinite(i)?i:void 0}function It(e){return{columns:[{name:`Verdict`,displayName:`Verdict`},...e.columns],rows:e.rows.map(t=>[Ve({judgedSessions:Ft(t,e,`Judged Sessions`),overSpecifiedSessions:Ft(t,e,`Over-specified Sessions`),underSpecifiedSessions:Ft(t,e,`Under-specified Sessions`)}),...t])}}function Lt(e,t){if(!e)return 0;let n=e.columns.findIndex(e=>e.name===t);return n<0?e.rows.length:new Set(e.rows.map(e=>e[n])).size}function Rt(e,t){if(!e)return!1;let n=e.columns.findIndex(e=>e.name===t);return n>=0&&e.rows.some(e=>typeof e[n]==`string`&&e[n].trim()!==``)}var zt={perRow:44,chrome:190},Bt={disableStackedDataLabels:!0};function Vt(e){let t=S.find(t=>t.name===e)??S[S.length-1];return(0,Z.jsxs)(`span`,{className:`inline-flex items-center gap-200`,children:[(0,Z.jsx)(K,{tone:t.tone,icon:t.icon}),(0,Z.jsx)(`span`,{children:t.name})]})}function Ht(e,t){if(typeof e==`number`)return M(e,`percent`);let n=t[`Judged Sessions`];return typeof n==`number`&&n>0?M(0,`percent`):null}function Ut(e){let t=o(e,`[Well-matched Share]`),n=o(e,`[Over-specified Share]`),r=o(e,`[Under-specified Share]`),i=t!==void 0||n!==void 0||r!==void 0,a=e=>e??(i?0:void 0);return{well:a(t),over:a(n),under:a(r)}}function $(e,t,n,r){return{id:e,header:t,width:n,numericStyling:!0,cellRenderer:r?G({domain:Pt,format:Ht,color:r}):(e,t)=>Ht(e,t)}}function Wt(e,t){switch(e){case`organization`:return Ue(t);case`person`:return We();case`task`:return He()}}function Gt(){let[e,t]=(0,q.useState)(`task`),{theme:i}=n(),s=c(),l=D(),u=(0,q.useMemo)(()=>ae(l,i),[l,i]),d=N(Ae()),f=Pe(),h=N({connection:f.connection,query:f.query,columnMetadata:f.columnMetadata}),g=Re(),_=N({connection:g.connection,query:g.query,columnMetadata:g.columnMetadata},{ignore:Mt}),v=(0,q.useMemo)(()=>Wt(e,s),[e,s]),y=N({connection:v.connection,query:v.query,columnMetadata:v.columnMetadata}),b=(0,q.useMemo)(()=>d.data?.status===`success`?p(d.data.table):void 0,[d.data]),x=(0,q.useMemo)(()=>h.data?.status===`success`?P(h.data.table,f.columnMetadata):void 0,[h.data,f.columnMetadata]),S=(0,q.useMemo)(()=>_.data?.status===`success`?P(_.data.table,g.columnMetadata):void 0,[_.data,g.columnMetadata]),E=(0,q.useMemo)(()=>y.data?.status===`success`?It(P(y.data.table,v.columnMetadata)):void 0,[y.data,v.columnMetadata]),te=(0,q.useMemo)(()=>oe(g.vegaLiteSpec,Nt,[u.positive,u.negative,u.caution,u.neutral]),[g.vegaLiteSpec,u]),M=Rt(E,`Main Reason`),re=(0,q.useMemo)(()=>jt(s.label),[s.label]),I=e===`person`?`User`:e===`organization`?s.label:`Task Category`,L=(0,q.useMemo)(()=>[{id:`Verdict`,header:`Verdict`,width:176,cellRenderer:e=>Vt(e)},{id:`Segment`,header:I,width:224},{id:`Main Model`,header:`Main model`,width:136},...M?[{id:`Main Reason`,header:`Main reason`,width:152}]:[],{id:`Sessions`,header:`Sessions`,width:96,numericStyling:!0},$(`Judged Share`,`Judged`,92),$(`Well-matched Share`,`Good match`,120),$(`Over-specified Share`,`Lighter model may do`,172,u.negative),$(`Under-specified Share`,`Try stronger`,116,u.caution),{id:`Judged Sessions`,header:`Judged sessions`,hidden:!0}],[u,I,M]),R=a(b,`[Coverage Notice]`),z=Ut(b),B=(0,q.useMemo)(()=>x?yt(x):void 0,[x]),V=(0,q.useMemo)(()=>S?xt(S):void 0,[S]);return(0,Z.jsxs)(ie,{id:m(`model-fit`),title:`Model fit`,description:`Whether the model doing the work suits it: a good match, a premium model on light work, or a mid-cost model on heavy work.`,children:[d.data?.status===`error`?(0,Z.jsx)(w,{message:d.data.error.message,onRetry:d.refetch}):d.isLoading||!d.data?(0,Z.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-5`,children:[(0,Z.jsx)(C,{}),(0,Z.jsx)(C,{}),(0,Z.jsx)(C,{}),(0,Z.jsx)(C,{}),(0,Z.jsx)(C,{})]}):b?(0,Z.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-5`,children:[(0,Z.jsx)(j,{label:`Sessions`,value:o(b,`[Sessions]`),emphasis:!0}),(0,Z.jsx)(j,{label:`Model logged`,value:o(b,`[Logged Share]`),format:`percent`,detail:`Share of sessions`}),(0,Z.jsx)(j,{label:`Good match`,value:z.well,format:`percent`,detail:`Model cost suits the work`}),(0,Z.jsx)(j,{label:`Lighter model may do`,value:z.over,format:`percent`,detail:`Premium model on light work`}),(0,Z.jsx)(j,{label:`Try stronger`,value:z.under,format:`percent`,detail:`Mid-cost model on Strong-fit work`})]}):(0,Z.jsx)(T,{title:`No model fit data`,description:`The semantic model returned no rows. Check that the model has been refreshed since the last data load.`}),(0,Z.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]`,children:[(0,Z.jsx)(`div`,{className:`h-[340px]`,style:x?{height:A(x.rows.length,zt)+(B?40:0)}:void 0,children:h.data?.status===`error`?(0,Z.jsx)(w,{className:`h-full`,message:h.data.error.message,onRetry:h.refetch}):h.isLoading||!x?(0,Z.jsx)(C,{className:`h-full`}):x.rows.length===0?(0,Z.jsx)(T,{className:`h-full`,title:`No model names logged`,description:`No sessions in this selection carry a model name yet.`}):(0,Z.jsx)(F,{text:B,children:(0,Z.jsx)(k,{label:`Model usage`,spec:f.vegaLiteSpec,data:x,theme:i,header:{title:`Model usage`,subtitle:`Sessions by logged model and cost tier`}})})}),(0,Z.jsxs)(`div`,{className:`flex flex-col gap-200`,children:[(0,Z.jsx)(ne,{ignored:Mt,reason:`this chart already splits sessions by Copilot and Agents.`}),(0,Z.jsx)(`div`,{className:`h-[340px]`,style:S?{height:A(Lt(S,`Activity`),zt)+(V?40:0)}:void 0,children:_.data?.status===`error`?(0,Z.jsx)(w,{className:`h-full`,message:_.data.error.message,onRetry:_.refetch}):_.isLoading||!S?(0,Z.jsx)(C,{className:`h-full`}):S.rows.length===0?(0,Z.jsx)(T,{className:`h-full`,title:`No sessions to split`,description:`There is no Copilot or agent activity in this selection.`}):(0,Z.jsx)(F,{text:V,children:(0,Z.jsx)(k,{label:`Match by tool`,spec:te,data:S,theme:i,capabilities:Bt,header:{title:`Match by tool`,subtitle:`Good matches, the two exceptions, and unjudged sessions`}})})})]})]}),(0,Z.jsxs)(`div`,{className:`flex flex-col gap-300`,children:[(0,Z.jsxs)(`div`,{className:`flex flex-wrap items-center gap-300`,children:[(0,Z.jsx)(`span`,{"aria-hidden":`true`,className:`text-[length:var(--text-300)] leading-300 font-semibold text-foreground`,children:`View verdicts by`}),(0,Z.jsx)(ee,{label:`View verdicts by`,options:re,value:e,onChange:t})]}),(0,Z.jsx)(`div`,{className:`flex h-[560px] flex-col`,style:E&&E.rows.length>0?{height:O(E.rows.length)}:void 0,children:y.data?.status===`error`?(0,Z.jsx)(w,{className:`h-full`,message:y.data.error.message,onRetry:y.refetch}):y.isLoading||!E?(0,Z.jsx)(C,{className:`h-full`}):E.rows.length===0?(0,Z.jsx)(T,{className:`h-full`,title:`No segments to judge`,description:`No sessions in this selection have enough model and task detail to build the table.`}):(0,Z.jsx)(r,{columns:L,data:E,defaultSort:[{columnId:`Sessions`,direction:`desc`}],theme:i,header:{title:`Verdicts by ${e===`organization`?s.noun:I.toLowerCase()}`,subtitle:`Top 25 by sessions. Shares are of judged sessions; a verdict needs five judged sessions.`}},e)})]}),R&&(0,Z.jsx)(`p`,{className:`max-w-[80ch] text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:R})]})}function Kt(){let{show:e}=E();return(0,Z.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[e(`cowork-fit`)&&(0,Z.jsx)(At,{}),e(`model-fit`)&&(0,Z.jsx)(Gt,{}),e(`model-fit`)&&(0,Z.jsx)(B,{page:`efficiency`})]})}export{Kt as EfficiencyScreen};