import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{n as t,t as n}from"./createLucideIcon-BXuy7Wl9.js";import{t as r}from"./arrow-right-jioFQtNf.js";import{D as i,E as a,M as o,N as s,ct as c,f as l,h as u,it as d,k as f,l as p,m,nt as h,ot as g,pt as _,xt as v}from"./utils-DUYIo-F3.js";import{c as y,i as b}from"./grading-method-Dbd-Pdja.js";import{n as x}from"./theme.context-nB_YDa86.js";import{t as S}from"./dist-B9Q5JOXV.js";import{E as C,T as w,w as T}from"./task-times.context-3Dus8clU.js";import{i as E}from"./stage-filter.context-BO0XkIwy.js";import{i as ee,m as D,n as te}from"./root-C09FNmYf.js";import{a as O,i as k,o as A,t as j}from"./kpi-card-BNTonUm8.js";import{t as ne}from"./filter-note-BaGyA24t.js";import{t as M}from"./format-kpi-BhveZiQQ.js";import{t as re}from"./on-demand-E0FHK3pK.js";import{t as ie}from"./section-C3ntZHBX.js";import{t as N}from"./use-filtered-query-4YDQ4zOW.js";import{t as P}from"./to-data-table-DHzdyPpP.js";import{n as ae,r as oe}from"./color-scale-DTyjSAgS.js";import{t as se}from"./headlined-DZJztt3s.js";import{i as F,n as I,o as L,t as R}from"./headline-CtXokBCs.js";import{t as z}from"./page-panel-gate-BX_ykk4V.js";import{a as B,c as ce,d as le,i as V,l as H,n as ue,o as de,r as U,s as fe,t as pe,u as me}from"./tree-grid-CoX8tm6H.js";import{i as he,r as ge,t as _e}from"./list-total-DtT6or2g.js";import{a as W,i as ve}from"./heat-gzD0bGVg.js";import{n as ye,t as G}from"./grade-mark-weVwMAxM.js";import"./agents-C38T9h_N.js";var be={name:`flag`,size:24,node:[[`path`,{d:`M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528`,key:`1jaruq`}]]};be.node;var xe=n(be),K=e(t(),1),Se=/\s{3,}/,Ce=/^([A-Za-z][A-Za-z ]*?)\s*·\s*(.+)$/;function we(e){return y(e)??y(`${e} fit`)}function Te(e){let t=[],n=[];for(let r of(e??``).split(Se)){let e=r.trim();if(!e)continue;let i=Ce.exec(e),a=i?we(i[1]):void 0;i&&a?t.push({grade:a,rule:i[2].replace(/\.$/,``)}):n.push(e)}return{grades:t,notes:n}}var Ee=`EVALUATE\r
ROW(\r
    "Cowork Sessions", [Usage Efficiency: Consumption Sessions],\r
    "Tasks Completed", [Usage Efficiency: Consumption Tasks],\r
    "Active Days Per User", [Usage Efficiency: Active Days Per User],\r
    "Expert Hours", [Cowork Hours (Task Category Basis)],\r
    "Strong Fit Share", [Usage Efficiency: High Fit Share],\r
    "Worth A Look Share", [Usage Efficiency: Low Fit Share],\r
    "Fit Notice", [Usage Efficiency: Fit Rule Notice]\r
)\r
`,De={"[Cowork Sessions]":{name:`Cowork Sessions`,displayName:`Cowork sessions`,format:`#,0`},"[Tasks Completed]":{name:`Tasks Completed`,displayName:`Tasks completed`,format:`#,0`},"[Active Days Per User]":{name:`Active Days Per User`,displayName:`Active days per user`,format:l},"[Expert Hours]":{name:`Expert Hours`,displayName:`Expert equivalent hours`,format:l},"[Strong Fit Share]":{name:`Strong Fit Share`,displayName:`Strong fit`,format:m},"[Worth A Look Share]":{name:`Worth A Look Share`,displayName:`Worth a look`,format:m},"[Fit Notice]":{name:`Fit Notice`,displayName:`Fit notice`}};function Oe(){return{connection:`vl`,query:Ee,columnMetadata:De}}var ke=`EVALUATE\r
ROW(\r
    "Sessions", [Model: Sessions],\r
    "Logged Share", [Model: Logged Session Share],\r
    "Well-matched Share", [Model: Well-matched Share],\r
    "Over-specified Share", [Model: Over-specified Share],\r
    "Under-specified Share", [Model: Under-specified Share],\r
    "Coverage Notice", [Model: Coverage Notice]\r
)\r
`,Ae={"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Logged Share]":{name:`Logged Share`,displayName:`Model logged`,format:m},"[Well-matched Share]":{name:`Well-matched Share`,displayName:`Good match`,format:m},"[Over-specified Share]":{name:`Over-specified Share`,displayName:`Lighter model may do`,format:m},"[Under-specified Share]":{name:`Under-specified Share`,displayName:`Try stronger`,format:m},"[Coverage Notice]":{name:`Coverage Notice`,displayName:`Coverage notice`}};function je(){return{connection:`vl`,query:ke,columnMetadata:Ae}}var Me=`EVALUATE\r
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
`,Ne={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Model`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:240}},x:{field:`Sessions`,type:`quantitative`,title:`Sessions`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}},color:{field:`Cost Tier`,type:`nominal`,title:`Cost tier`,sort:{field:`Tier Sort`,order:`ascending`},legend:{labelLimit:240}},tooltip:[{field:`Model`,type:`nominal`,title:`Model`},{field:`Cost Tier`,type:`nominal`,title:`Cost tier`},{field:`Sessions`,type:`quantitative`,title:`Sessions`,format:`,.0f`},{field:`Usage Share`,type:`quantitative`,title:`Share`,format:`.1%`}]}},Pe={"[Model]":{name:`Model`,displayName:`Model`},"[Cost Tier]":{name:`Cost Tier`,displayName:`Cost tier`},"[Tier Sort]":{name:`Tier Sort`,displayName:`Tier sort`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Usage Share]":{name:`Usage Share`,displayName:`Share`,format:m}};function Fe(){return{connection:`vl`,query:Me,columnMetadata:Pe,vegaLiteSpec:Ne}}var Ie=`EVALUATE\r
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
`,Le={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},encoding:{y:{field:`Activity`,type:`nominal`,title:null,sort:`ascending`,axis:{labelLimit:200}},x:{field:`Share`,type:`quantitative`,stack:`zero`,title:`Share of sessions`,scale:{domain:[0,1]},axis:{labelExpr:`format(datum.value, '.0%')`}},color:{field:`Outcome`,type:`nominal`,title:`Outcome`,scale:{domain:[`Good match`,`Lighter model may do`,`Try stronger`,`Not judged`]}},order:{field:`Outcome Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Activity`,type:`nominal`,title:`Activity`},{field:`Outcome`,type:`nominal`,title:`Outcome`},{field:`Sessions`,type:`quantitative`,title:`Sessions`,format:`,.0f`},{field:`Share`,type:`quantitative`,title:`Share`,format:`.1%`}]}},Re={"[Activity]":{name:`Activity`,displayName:`Activity`},"[Outcome]":{name:`Outcome`,displayName:`Outcome`},"[Outcome Order]":{name:`Outcome Order`,displayName:`Outcome order`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Share]":{name:`Share`,displayName:`Share`,format:m}};function ze(){return{connection:`vl`,query:Ie,columnMetadata:Re,vegaLiteSpec:Le}}var Be=`EVALUATE\r
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
`,Ve={"[Segment]":{name:`Segment`,displayName:`Segment`},"[Main Model]":{name:`Main Model`,displayName:`Main model`},"[Main Reason]":{name:`Main Reason`,displayName:`Main reason`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Judged Sessions]":{name:`Judged Sessions`,displayName:`Judged sessions`,format:`#,0`},"[Well-matched Sessions]":{name:`Well-matched Sessions`,displayName:`Good match`,format:`#,0`},"[Over-specified Sessions]":{name:`Over-specified Sessions`,displayName:`Lighter model may do`,format:`#,0`},"[Under-specified Sessions]":{name:`Under-specified Sessions`,displayName:`Try stronger`,format:`#,0`},"[Judged Share]":{name:`Judged Share`,displayName:`Judged`,format:m},"[Well-matched Share]":{name:`Well-matched Share`,displayName:`Good match`,format:m},"[Over-specified Share]":{name:`Over-specified Share`,displayName:`Lighter model may do`,format:m},"[Under-specified Share]":{name:`Under-specified Share`,displayName:`Try stronger`,format:m}};function q(e){return typeof e==`number`&&Number.isFinite(e)?e:0}function He({judgedSessions:e,overSpecifiedSessions:t,underSpecifiedSessions:n}){let r=q(e);if(r<5)return`Not judged`;let i=q(t),a=q(n),o=r-i-a;return o>=i&&o>=a?`Good match`:i>=a?`Lighter model may do`:`Try stronger`}function J(e,t){return{connection:`vl`,query:Be.replace(/__GROUPING_COLUMN__|__BLANK_LABEL__/g,n=>n===`__GROUPING_COLUMN__`?e:t.replaceAll(`"`,`""`)),columnMetadata:Ve}}function Ue(){return J(`'Chat + Agent Interactions (Audit Logs)'[Task Breakdown Group]`,`Unclassified task`)}function We(e=g(d)){return _(J(c(d),`Unassigned ${e.noun}`),e)}function Ge(){return J(`'Chat + Agent Interactions (Audit Logs)'[Audit_UserId]`,`Unattributed user`)}var Ke=`EVALUATE\r
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
`,qe={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},encoding:{y:{field:`Task`,type:`nominal`,title:null,sort:{field:`Task Sessions`,op:`max`,order:`descending`},axis:{labelLimit:200}},x:{field:`Share`,type:`quantitative`,stack:`zero`,title:`Share of the task`,scale:{domain:[0,1]},axis:{labelExpr:`format(datum.value, '.0%')`}},color:{field:`Grade`,type:`nominal`,title:`Fit`,scale:{domain:[`Strong fit`,`Fair fit`,`Worth a look`]}},order:{field:`Grade Order`,type:`quantitative`,sort:`ascending`},tooltip:[{field:`Task`,type:`nominal`,title:`Task Breakdown`},{field:`Grade`,type:`nominal`,title:`Fit`},{field:`Share`,type:`quantitative`,title:`Share of the task`,format:`.0%`},{field:`Sessions`,type:`quantitative`,title:`Graded sessions`,format:`,.0f`}]}},Je=[`Strong fit`,`Fair fit`,`Worth a look`],Ye={"[Task]":{name:`Task`,displayName:`Task Breakdown`},"[Grade]":{name:`Grade`,displayName:`Fit`},"[Grade Order]":{name:`Grade Order`,displayName:`Fit order`,format:`#,0`},"[Share]":{name:`Share`,displayName:`Share of the task`,format:m},"[Sessions]":{name:`Sessions`,displayName:`Graded sessions`,format:`#,0`},"[Task Sessions]":{name:`Task Sessions`,displayName:`Graded sessions in the task`,format:`#,0`}};function Xe(){return{connection:`vl`,query:Ke,columnMetadata:Ye,vegaLiteSpec:qe}}function Ze(e){let t=e.columns.findIndex(e=>e.name===`Grade`),n=e.columns.findIndex(e=>e.name===`Grade Order`);return t<0?e:{...e,rows:e.rows.map(e=>{let r=[...e];return r[t]=y(e[t],n>=0?e[n]:void 0)?.name??e[t],r})}}var Qe=`EVALUATE\r
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
`,$e=`Chat + Agent Interactions (Audit Logs)Work Weight Grade`,et=`Chat + Agent Interactions (Audit Logs)Work Weight Grade Sort`,tt=`Chat + Agent Interactions (Audit Logs)Work Shape`,nt=`Chat + Agent Interactions (Audit Logs)Work Shape Sort`,Y=`Work`,rt=[`Sessions`,`Decided By`,`Could Have Used`,`Share Of Work`,`Source Items`,`Source Types`],it={"Chat + Agent Interactions (Audit Logs)[Work Weight Grade]":{name:$e,displayName:`Grade`},"Chat + Agent Interactions (Audit Logs)[Work Weight Grade Sort]":{name:et},"Chat + Agent Interactions (Audit Logs)[Work Shape]":{name:tt,displayName:`How it was done`},"Chat + Agent Interactions (Audit Logs)[Work Shape Sort]":{name:nt},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Decided By]":{name:`Decided By`,displayName:`Decided by`},"[Could Have Used]":{name:`Could Have Used`,displayName:`Could have used`},"[Share Of Work]":{name:`Share Of Work`,displayName:`% of work`,format:m},"[Source Items]":{name:`Source Items`,displayName:`Source items`,format:l},"[Source Types]":{name:`Source Types`,displayName:`Source types`,format:l}};function at(){return{connection:`vl`,query:Qe,columnMetadata:it}}function ot(e){return me(e,{group:$e,leaf:tt,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:Y,fields:rt,groupLabel:(e,t)=>y(e,t(et))?.name})}var st=`DEFINE\r
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
`,ct=`Chat + Agent Org DataOrganization`,lt=`Chat + Agent Interactions (Audit Logs)Audit_UserId`,ut=[`People`,`Sessions`,`Strong`,`Fair`,`Worth A Look`,`Flagged People`],dt={"Chat + Agent Org Data[Organization]":{name:ct,displayName:`Organization`},"Chat + Agent Interactions (Audit Logs)[Audit_UserId]":{name:lt,displayName:`Person`},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Graded sessions`,format:`#,0`},"[Strong]":{name:`Strong`,displayName:`Strong`,format:m},"[Fair]":{name:`Fair`,displayName:`Fair`,format:m},"[Worth A Look]":{name:`Worth A Look`,displayName:`Worth a look`,format:m},"[Flagged People]":{name:`Flagged People`,displayName:`Flagged`,format:`#,0`},...u};function ft(e=g(d)){return _({connection:`vl`,query:st,columnMetadata:dt},e)}function pt(e,t){return me(e,{group:ct,leaf:lt,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:`Who`,fields:ut,blankLabel:t})}var X=v(),mt={min:0,max:1},ht=[{id:Y},{id:`Sessions`,format:U(`whole`)},{id:`Decided By`},{id:`Could Have Used`},{id:`Share Of Work`,format:U(`percent`)},{id:`Source Items`,format:U(`decimal`)},{id:`Source Types`,format:U(`decimal`)}];function gt({ignore:e}){let{theme:t}=x(),n=at(),r=N({connection:n.connection,query:n.query,columnMetadata:n.columnMetadata},{ignore:e}),i=(0,K.useMemo)(()=>r.data?.status===`success`?ot(P(r.data.table,n.columnMetadata)):void 0,[r.data,n.columnMetadata]),a=i?.rows.map(e=>e._id).join(`|`)??``,o=(0,K.useMemo)(()=>de(i,!0),[i]),{ids:s,onRowToggle:c}=fe(a),l=(0,K.useMemo)(()=>{let e=i?.rows??[],t=e.flatMap(e=>e._children??[]);return{group:ve(e.map(e=>e[`Share Of Work`])),leaf:ve(t.map(e=>e[`Share Of Work`]))}},[i]),u=(0,K.useMemo)(()=>[{id:Y,header:`Grade / how it was done`,width:184,cellRenderer:(e,t)=>{if(!H(t))return V(e);let n=y(e);return(0,X.jsxs)(`span`,{className:`inline-flex items-center gap-200 font-semibold`,children:[n&&(0,X.jsx)(G,{tone:n.tone}),V(e)]})}},{id:`Sessions`,header:`Sessions`,width:96,numericStyling:!0,cellRenderer:U(`whole`)},{id:`Decided By`,header:`Decided by`,minWidth:240},{id:`Could Have Used`,header:`Could have used`,width:168},{id:`Share Of Work`,header:`% of work`,width:108,numericStyling:!0,cellRenderer:W({domain:e=>H(e)?l.group:l.leaf,format:U(`percent`)})},{id:`Source Items`,header:`Source items`,width:120,numericStyling:!0,cellRenderer:U(`decimal`)},{id:`Source Types`,header:`Source types`,width:120,numericStyling:!0,cellRenderer:U(`decimal`)}],[l]),d=(0,K.useMemo)(()=>B(i?.total,ht),[i]),f=le(o??[],e=>!s.has(e._id));return(0,X.jsx)(ce,{tree:i,error:r.data?.status===`error`?r.data.error.message:void 0,onRetry:r.refetch,isLoading:r.isLoading,height:i?O(f+ +!!d,pe):void 0,emptyTitle:`No graded Cowork work`,emptyDescription:`No Cowork session in this selection carries enough detail to say how the work was done.`,children:(0,X.jsx)(S,{columns:u,data:o,grandTotals:d?{position:`bottom`,data:d}:void 0,onRowToggle:c,theme:t,header:{title:`How the work was done`,subtitle:`Each grade, then the shapes of work inside it. Sources are the median per session.`}},a)})}function _t(e,t){let n=ue(e);if(!n)return null;let r=H(t);return(0,X.jsxs)(`span`,{className:`inline-flex items-center gap-100 font-semibold text-caution`,children:[(0,X.jsx)(xe,{className:`icon-size-100`,strokeWidth:2.5,"aria-hidden":`true`}),r?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`span`,{className:`tabular-nums`,children:M(n,`whole`)}),(0,X.jsx)(`span`,{className:`sr-only`,children:n===1?`person flagged`:`people flagged`})]}):(0,X.jsx)(`span`,{className:`sr-only`,children:`Flagged`})]})}function vt({ignore:e}){let{theme:t}=x(),n=s(),r=D(),i=(0,K.useMemo)(()=>ft(n),[n]),a=N({connection:i.connection,query:i.query,columnMetadata:i.columnMetadata},{ignore:e}),o=`Unassigned ${n.noun}`,c=(0,K.useMemo)(()=>a.data?.status===`success`?P(a.data.table,i.columnMetadata):void 0,[a.data,i.columnMetadata]),l=(0,K.useMemo)(()=>c?pt(c,o):void 0,[c,o]),u=`${n.column}|${l?.rows.map(e=>e._id).join(`|`)??``}`,d=(0,K.useMemo)(()=>de(l,!1),[l]),{ids:f,onRowToggle:p}=fe(u),m=(0,K.useMemo)(()=>[{id:`Who`,header:`${n.label} / person`,minWidth:240,cellRenderer:(e,t)=>H(t)?(0,X.jsx)(`span`,{className:`font-semibold`,children:V(e)}):V(e)},{id:`People`,header:`People`,width:88,numericStyling:!0,cellRenderer:(e,t)=>H(t)?U(`whole`)(e):null},{id:`Sessions`,header:`Graded sessions`,width:140,numericStyling:!0,cellRenderer:U(`whole`)},{id:`Mix`,header:`Mix`,width:104,sortable:!1,cellRenderer:(e,t)=>(0,X.jsx)(ye,{strong:t.Strong,fair:t.Fair,worth:t[`Worth A Look`]})},{id:`Strong`,header:`Strong`,width:96,numericStyling:!0,cellRenderer:U(`percent`)},{id:`Fair`,header:`Fair`,width:96,numericStyling:!0,cellRenderer:U(`percent`)},{id:`Worth A Look`,header:`Worth a look`,width:124,numericStyling:!0,cellRenderer:W({domain:mt,format:U(`percent`),color:r?.caution})},{id:`Flagged People`,header:`Flag`,width:88,cellRenderer:_t}],[n.label,r]),h=(0,K.useMemo)(()=>B(l?.total,[{id:`Who`},{id:`People`,format:U(`whole`)},{id:`Sessions`,format:U(`whole`)},{id:`Mix`},{id:`Strong`,format:U(`percent`)},{id:`Fair`,format:U(`percent`)},{id:`Worth A Look`,format:U(`percent`)},{id:`Flagged People`,format:U(`whole`)}]),[l]),g=le(d??[],e=>f.has(e._id));return(0,X.jsxs)(`div`,{className:`flex flex-col gap-200`,children:[(0,X.jsx)(ce,{tree:l,error:a.data?.status===`error`?a.data.error.message:void 0,onRetry:a.refetch,isLoading:a.isLoading,height:l?O(g+ +!!h,pe):void 0,emptyTitle:`Nobody with enough graded sessions`,emptyDescription:`A person or ${n.noun} appears here once they have five graded Cowork sessions in this selection.`,children:(0,X.jsx)(S,{columns:m,data:d,defaultSort:[{columnId:`Sessions`,direction:`desc`}],grandTotals:h?{position:`bottom`,data:h}:void 0,onRowToggle:p,theme:t,header:{title:`Who is doing it`,subtitle:`Each ${n.noun}, then its people. Shares are of graded sessions; a flag marks half or more at Worth a look.`}},u)}),c&&(0,X.jsx)(he,{shown:_e(c),total:ge(c),noun:`person rows`,by:`by graded sessions`,rollup:!0})]})}var yt=I({label:`Task`,value:`Sessions`,of:`graded sessions`}),bt=I({label:`Model`,value:`Sessions`,of:`sessions with a logged model`}),xt=`Good match`,St=R(e=>{let t=L(e,`Activity`,`Sessions`),n=e.columns.findIndex(e=>e.name===`Outcome`),r=e.columns.findIndex(e=>e.name===`Activity`),i=e.columns.findIndex(e=>e.name===`Sessions`);if(n<0||r<0||i<0)return;let a=new Map;for(let t of e.rows){let e=t[i];if(t[n]!==xt||typeof e!=`number`||!Number.isFinite(e))continue;let o=String(t[r]);a.set(o,(a.get(o)??0)+e)}let o=[...t].filter(([,e])=>e>=5).map(([e,t])=>({activity:e,total:t,good:a.get(e)??0}));if(o.length<2||o.some(e=>e.good<0))return;o.sort((e,t)=>t.good/t.total-e.good/e.total);let s=o[0],c=o[o.length-1],l=F(s.good,s.total);if(s.good<=0||l===F(o[1].good,o[1].total))return;let u=F(c.good,c.total);return`Good matches make up ${l} of ${s.activity} sessions, against ${u} of ${c.activity} sessions. A comparison, not a cause.`},I({label:`Outcome`,value:`Sessions`,of:`sessions`})),Z=[`audience`,`agentTypes`,`agentNames`],Ct={perRow:44,chrome:190},wt={disableStackedDataLabels:!0},Tt=`text-[length:var(--text-200)] leading-200`,Et=`text-[length:var(--text-300)] leading-300`;function Dt(e){let t=a(e,`[Strong Fit Share]`),n=a(e,`[Worth A Look Share]`),r=t!==void 0||n!==void 0;return{strong:t??(r?0:void 0),worth:n??(r?0:void 0)}}function Ot(e){return new Set(e).size}function kt(){let{theme:e}=x(),t=D(),n=Xe(),r=N({connection:n.connection,query:n.query,columnMetadata:n.columnMetadata},{ignore:Z}),i=(0,K.useMemo)(()=>r.data?.status===`success`?Ze(P(r.data.table,n.columnMetadata)):void 0,[r.data,n.columnMetadata]),a=(0,K.useMemo)(()=>{let r=ae(t,e);return oe(n.vegaLiteSpec,Je,[r.positive,r.neutral,r.caution])},[n.vegaLiteSpec,t,e]),o=i?.columns.findIndex(e=>e.name===`Task`)??-1,s=i&&o>=0?Ot(i.rows.map(e=>e[o])):0,c=(0,K.useMemo)(()=>i?yt(i):void 0,[i]);return(0,X.jsx)(`div`,{className:`h-[400px]`,style:i?{height:A(s,Ct)+(c?40:0)}:void 0,children:r.data?.status===`error`?(0,X.jsx)(w,{className:`h-full`,message:r.data.error.message,onRetry:r.refetch}):r.isLoading||!i?(0,X.jsx)(C,{className:`h-full`}):i.rows.length===0?(0,X.jsx)(T,{className:`h-full`,title:`No tasks to grade`,description:`No graded Cowork session in this selection carries a Task Breakdown.`}):(0,X.jsx)(se,{text:c,children:(0,X.jsx)(k,{label:`What goes to Cowork`,spec:a,data:i,theme:e,capabilities:wt,header:{title:`What goes to Cowork`,subtitle:`Graded sessions for each Task Breakdown, by fit. Busiest first.`}})})})}function At({notice:e}){let t=(0,K.useId)(),{grades:n,notes:i}=(0,K.useMemo)(()=>Te(e),[e]),a=te(`appendix`,`grading-method`);return(0,X.jsxs)(`article`,{"aria-labelledby":t,className:`flex flex-col rounded-xl border border-border bg-card`,children:[(0,X.jsx)(`h3`,{id:t,className:`border-b border-border px-500 py-400 text-[length:var(--text-400)] leading-400 font-semibold text-foreground`,children:`How sessions are graded`}),n.length>0&&(0,X.jsx)(`dl`,{className:`flex flex-col divide-y divide-border px-500`,children:n.map(({grade:e,rule:t})=>(0,X.jsxs)(`div`,{className:`flex flex-col gap-100 py-300`,children:[(0,X.jsxs)(`dt`,{className:`flex items-center gap-200 ${Et} font-semibold text-foreground`,children:[(0,X.jsx)(G,{tone:e.tone}),e.name]}),(0,X.jsx)(`dd`,{className:`${Et} text-muted-foreground first-letter:uppercase`,children:t})]},e.name))}),(0,X.jsxs)(`div`,{className:`mt-auto flex flex-col gap-200 border-t border-border px-500 py-300`,children:[i.map(e=>(0,X.jsx)(`p`,{className:`${Tt} max-w-[68ch] text-muted-foreground`,children:e},e)),(0,X.jsxs)(`button`,{type:`button`,onClick:a,className:`inline-flex w-fit items-center gap-100 ${Tt} font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`,children:[`How grading works, and the research behind it`,(0,X.jsx)(r,{className:`icon-size-100`,"aria-hidden":`true`})]})]})]})}function jt(){let{filters:e,applicable:t}=o(),n=s(),r=N(Oe(),{ignore:Z}),c=h(e,t),l=(0,K.useMemo)(()=>r.data?.status===`success`?f(r.data.table):void 0,[r.data]),u=a(l,`[Cowork Sessions]`),d=i(l,`[Fit Notice]`),m=Dt(l);return(0,X.jsxs)(ie,{id:p(`cowork-fit`),title:`Cowork fit`,description:`Whether the work people hand to Cowork suits it, judged by the apps and sources each session touched.`,children:[(0,X.jsx)(ne,{ignored:Z,reason:`Cowork fit always reads every Cowork session.`}),c?(0,X.jsx)(T,{title:`No Cowork sessions for unlicensed people`,description:`Cowork needs a Copilot license, so unlicensed people have no Cowork sessions to grade. Set License to All or Licensed.`}):r.data?.status===`error`?(0,X.jsx)(w,{message:r.data.error.message,onRetry:r.refetch}):r.isLoading||!r.data?(0,X.jsx)(`div`,{className:`grid gap-300 md:grid-cols-3 xl:grid-cols-6`,children:Array.from({length:6},(e,t)=>(0,X.jsx)(C,{},t))}):u===void 0?(0,X.jsx)(T,{title:`No Cowork activity to grade yet`,description:`${d?`${d} `:``}Cowork sessions are graded here as soon as the audit log records them.`}):(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-3 xl:grid-cols-6`,children:[(0,X.jsx)(j,{label:`Cowork sessions`,value:u,emphasis:!0}),(0,X.jsx)(j,{label:`Tasks completed`,value:a(l,`[Tasks Completed]`)}),(0,X.jsx)(j,{label:`Active days per user`,value:a(l,`[Active Days Per User]`),format:`hours`}),(0,X.jsx)(j,{label:`Expert equivalent hours`,value:a(l,`[Expert Hours]`),format:`hours`}),(0,X.jsx)(j,{label:`Strong fit`,value:m.strong,format:`percent`,detail:`Share of graded sessions`}),(0,X.jsx)(j,{label:`Worth a look`,value:m.worth,format:`percent`,detail:`Share of graded sessions`})]}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 items-start gap-500 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]`,children:[(0,X.jsx)(kt,{}),(0,X.jsx)(At,{notice:d})]}),(0,X.jsx)(gt,{ignore:Z}),(0,X.jsx)(re,{id:`cowork-fit-people`,label:`Show by ${n.noun} and person`,note:`Graded sessions and the fit mix for each ${n.noun}, opening to its people.`,children:(0,X.jsx)(vt,{ignore:Z})})]})]})}function Mt(e){return[{id:`task`,label:`Task Category`},{id:`organization`,label:e},{id:`person`,label:`User`}]}var Nt=[`audience`],Pt=[`Good match`,`Lighter model may do`,`Try stronger`,`Not judged`],Ft={min:0,max:1};function Q(e,t,n){let r=t.columns.findIndex(e=>e.name===n);if(r<0)return;let i=e[r];return typeof i==`number`&&Number.isFinite(i)?i:void 0}function It(e){return{columns:[{name:`Verdict`,displayName:`Verdict`},...e.columns],rows:e.rows.map(t=>[He({judgedSessions:Q(t,e,`Judged Sessions`),overSpecifiedSessions:Q(t,e,`Over-specified Sessions`),underSpecifiedSessions:Q(t,e,`Under-specified Sessions`)}),...t])}}function Lt(e,t){if(!e)return 0;let n=e.columns.findIndex(e=>e.name===t);return n<0?e.rows.length:new Set(e.rows.map(e=>e[n])).size}function Rt(e,t){if(!e)return!1;let n=e.columns.findIndex(e=>e.name===t);return n>=0&&e.rows.some(e=>typeof e[n]==`string`&&e[n].trim()!==``)}var zt={perRow:44,chrome:190},Bt={disableStackedDataLabels:!0};function Vt(e){let t=b.find(t=>t.name===e)??b[b.length-1];return(0,X.jsxs)(`span`,{className:`inline-flex items-center gap-200`,children:[(0,X.jsx)(G,{tone:t.tone,icon:t.icon}),(0,X.jsx)(`span`,{children:t.name})]})}function Ht(e,t){if(typeof e==`number`)return M(e,`percent`);let n=t[`Judged Sessions`];return typeof n==`number`&&n>0?M(0,`percent`):null}function Ut(e){let t=a(e,`[Well-matched Share]`),n=a(e,`[Over-specified Share]`),r=a(e,`[Under-specified Share]`),i=t!==void 0||n!==void 0||r!==void 0,o=e=>e??(i?0:void 0);return{well:o(t),over:o(n),under:o(r)}}function $(e,t,n,r){return{id:e,header:t,width:n,numericStyling:!0,cellRenderer:r?W({domain:Ft,format:Ht,color:r}):(e,t)=>Ht(e,t)}}function Wt(e,t){switch(e){case`organization`:return We(t);case`person`:return Ge();case`task`:return Ue()}}function Gt(){let[e,t]=(0,K.useState)(`task`),{theme:n}=x(),r=s(),o=D(),c=(0,K.useMemo)(()=>ae(o,n),[o,n]),l=N(je()),u=Fe(),d=N({connection:u.connection,query:u.query,columnMetadata:u.columnMetadata}),m=ze(),h=N({connection:m.connection,query:m.query,columnMetadata:m.columnMetadata},{ignore:Nt}),g=(0,K.useMemo)(()=>Wt(e,r),[e,r]),_=N({connection:g.connection,query:g.query,columnMetadata:g.columnMetadata}),v=(0,K.useMemo)(()=>l.data?.status===`success`?f(l.data.table):void 0,[l.data]),y=(0,K.useMemo)(()=>d.data?.status===`success`?P(d.data.table,u.columnMetadata):void 0,[d.data,u.columnMetadata]),b=(0,K.useMemo)(()=>h.data?.status===`success`?P(h.data.table,m.columnMetadata):void 0,[h.data,m.columnMetadata]),E=(0,K.useMemo)(()=>_.data?.status===`success`?It(P(_.data.table,g.columnMetadata)):void 0,[_.data,g.columnMetadata]),te=(0,K.useMemo)(()=>oe(m.vegaLiteSpec,Pt,[c.positive,c.negative,c.caution,c.neutral]),[m.vegaLiteSpec,c]),M=Rt(E,`Main Reason`),re=(0,K.useMemo)(()=>Mt(r.label),[r.label]),F=e===`person`?`User`:e===`organization`?r.label:`Task Category`,I=(0,K.useMemo)(()=>[{id:`Verdict`,header:`Verdict`,width:176,cellRenderer:e=>Vt(e)},{id:`Segment`,header:F,width:224},{id:`Main Model`,header:`Main model`,width:136},...M?[{id:`Main Reason`,header:`Main reason`,width:152}]:[],{id:`Sessions`,header:`Sessions`,width:96,numericStyling:!0},$(`Judged Share`,`Judged`,92),$(`Well-matched Share`,`Good match`,120),$(`Over-specified Share`,`Lighter model may do`,172,c.negative),$(`Under-specified Share`,`Try stronger`,116,c.caution),{id:`Judged Sessions`,header:`Judged sessions`,hidden:!0}],[c,F,M]),L=i(v,`[Coverage Notice]`),R=Ut(v),z=(0,K.useMemo)(()=>y?bt(y):void 0,[y]),B=(0,K.useMemo)(()=>b?St(b):void 0,[b]);return(0,X.jsxs)(ie,{id:p(`model-fit`),title:`Model fit`,description:`Whether the model doing the work suits it: a good match, a premium model on light work, or a mid-cost model on heavy work.`,children:[l.data?.status===`error`?(0,X.jsx)(w,{message:l.data.error.message,onRetry:l.refetch}):l.isLoading||!l.data?(0,X.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-5`,children:[(0,X.jsx)(C,{}),(0,X.jsx)(C,{}),(0,X.jsx)(C,{}),(0,X.jsx)(C,{}),(0,X.jsx)(C,{})]}):v?(0,X.jsxs)(`div`,{className:`grid gap-300 md:grid-cols-2 xl:grid-cols-5`,children:[(0,X.jsx)(j,{label:`Sessions`,value:a(v,`[Sessions]`),emphasis:!0}),(0,X.jsx)(j,{label:`Model logged`,value:a(v,`[Logged Share]`),format:`percent`,detail:`Share of sessions`}),(0,X.jsx)(j,{label:`Good match`,value:R.well,format:`percent`,detail:`Model cost suits the work`}),(0,X.jsx)(j,{label:`Lighter model may do`,value:R.over,format:`percent`,detail:`Premium model on light work`}),(0,X.jsx)(j,{label:`Try stronger`,value:R.under,format:`percent`,detail:`Mid-cost model on Strong-fit work`})]}):(0,X.jsx)(T,{title:`No model fit data`,description:`The semantic model returned no rows. Check that the model has been refreshed since the last data load.`}),(0,X.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]`,children:[(0,X.jsx)(`div`,{className:`h-[340px]`,style:y?{height:A(y.rows.length,zt)+(z?40:0)}:void 0,children:d.data?.status===`error`?(0,X.jsx)(w,{className:`h-full`,message:d.data.error.message,onRetry:d.refetch}):d.isLoading||!y?(0,X.jsx)(C,{className:`h-full`}):y.rows.length===0?(0,X.jsx)(T,{className:`h-full`,title:`No model names logged`,description:`No sessions in this selection carry a model name yet.`}):(0,X.jsx)(se,{text:z,children:(0,X.jsx)(k,{label:`Model usage`,spec:u.vegaLiteSpec,data:y,theme:n,header:{title:`Model usage`,subtitle:`Sessions by logged model and cost tier`}})})}),(0,X.jsxs)(`div`,{className:`flex flex-col gap-200`,children:[(0,X.jsx)(ne,{ignored:Nt,reason:`this chart already splits sessions by Copilot and Agents.`}),(0,X.jsx)(`div`,{className:`h-[340px]`,style:b?{height:A(Lt(b,`Activity`),zt)+(B?40:0)}:void 0,children:h.data?.status===`error`?(0,X.jsx)(w,{className:`h-full`,message:h.data.error.message,onRetry:h.refetch}):h.isLoading||!b?(0,X.jsx)(C,{className:`h-full`}):b.rows.length===0?(0,X.jsx)(T,{className:`h-full`,title:`No sessions to split`,description:`There is no Copilot or agent activity in this selection.`}):(0,X.jsx)(se,{text:B,children:(0,X.jsx)(k,{label:`Match by tool`,spec:te,data:b,theme:n,capabilities:Bt,header:{title:`Match by tool`,subtitle:`Good matches, the two exceptions, and unjudged sessions`}})})})]})]}),(0,X.jsxs)(`div`,{className:`flex flex-col gap-300`,children:[(0,X.jsxs)(`div`,{className:`flex flex-wrap items-center gap-300`,children:[(0,X.jsx)(`span`,{"aria-hidden":`true`,className:`text-[length:var(--text-300)] leading-300 font-semibold text-foreground`,children:`View verdicts by`}),(0,X.jsx)(ee,{label:`View verdicts by`,options:re,value:e,onChange:t})]}),(0,X.jsx)(`div`,{className:`flex h-[560px] flex-col`,style:E&&E.rows.length>0?{height:O(E.rows.length)}:void 0,children:_.data?.status===`error`?(0,X.jsx)(w,{className:`h-full`,message:_.data.error.message,onRetry:_.refetch}):_.isLoading||!E?(0,X.jsx)(C,{className:`h-full`}):E.rows.length===0?(0,X.jsx)(T,{className:`h-full`,title:`No segments to judge`,description:`No sessions in this selection have enough model and task detail to build the table.`}):(0,X.jsx)(S,{columns:I,data:E,defaultSort:[{columnId:`Sessions`,direction:`desc`}],theme:n,header:{title:`Verdicts by ${e===`organization`?r.noun:F.toLowerCase()}`,subtitle:`Top 25 by sessions. Shares are of judged sessions; a verdict needs five judged sessions.`}},e)})]}),L&&(0,X.jsx)(`p`,{className:`max-w-[80ch] text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:L})]})}function Kt(){let{show:e}=E();return(0,X.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[e(`cowork-fit`)&&(0,X.jsx)(jt,{}),e(`model-fit`)&&(0,X.jsx)(Gt,{}),e(`model-fit`)&&(0,X.jsx)(z,{page:`efficiency`})]})}export{Kt as EfficiencyScreen};