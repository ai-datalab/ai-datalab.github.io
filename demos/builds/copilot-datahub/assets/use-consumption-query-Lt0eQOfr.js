import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import"./demo-D2FNvRSB.js";import{t}from"./react-CQOZoUwg.js";import{D as n,E as r,d as i,f as a,gt as o,h as s,k as ee,m as c,p as l,st as u,wt as te,yt as d}from"./utils-CCoPj5LP.js";import{A as ne,B as f,G as re,H as ie,K as p,U as m,V as h,W as g,b as ae,g as _,q as v,v as oe}from"./task-times.context-BBcn0_iQ.js";import{r as y,u as se}from"./root-gWGWd7kV.js";import{n as ce,r as le,t as ue}from"./use-table-query-oZqAJ6wv.js";import{u as b}from"./tree-grid-DM4gP5Lp.js";var x=e(t(),1),S=(0,x.createContext)({status:`ready`,saved:null,model:void 0,save:()=>Promise.reject(Error(`Commercial terms can't be saved here.`))});function C(){return(0,x.useContext)(S)}function de(){return y().loadCommercialTerms()}function fe(e,t){return y().saveCommercialTerms(e,t)}var w=te();function T(e){return e instanceof Error&&e.message?e.message:String(e)}function E({children:e,readModel:t=!0}){let[n,i]=(0,x.useState)({status:`loading`}),a=(0,x.useContext)(se)?.session?.user?.email;(0,x.useEffect)(()=>{let e=!1;return de().then(t=>!e&&i({status:`ready`,saved:t}),t=>!e&&i({status:`unavailable`,reason:T(t)})),()=>{e=!0}},[]);let o=_(),s=ne({connection:t?o.connection:``,query:o.query}),c=(0,x.useMemo)(()=>{if(s.data?.status!==`success`)return;let e=ee(s.data.table);return{creditRate:r(e,`[Credit Rate]`),prepaidCreditRate:r(e,`[Prepaid Credit Rate]`),prepaidCreditBalance:r(e,`[Prepaid Credit Balance]`)}},[s.data]),l=(0,x.useCallback)(async e=>{let t=await fe(e,a);i({status:`ready`,saved:t})},[a]),u=(0,x.useMemo)(()=>({status:n.status,unavailableReason:n.status===`unavailable`?n.reason:void 0,saved:n.status===`ready`?n.saved:null,model:c,save:l}),[n,c,l]);return(0,w.jsx)(S.Provider,{value:u,children:e})}var D=`// GitHub Copilot is left out: this page covers Cowork / Work IQ, Copilot\r
// Studio and Azure. The sort keeps the report's product order.\r
EVALUATE\r
SELECTCOLUMNS(\r
    FILTER('Reporting Product', 'Reporting Product'[Product] <> "GitHub Copilot"),\r
    "Product", 'Reporting Product'[Product],\r
    "Product Sort",\r
        SWITCH('Reporting Product'[Product], "Cowork / Work IQ", 1, "Copilot Studio", 2, "Azure AI Foundry", 3, 9),\r
    "Credits", [Reporting Product Credits],\r
    "Cost", [Reporting Product Cost],\r
    "Cost Basis", [Reporting Cost Basis],\r
    "Coverage", [Reporting Coverage]\r
)\r
ORDER BY [Product Sort] ASC\r
`,O=`EVALUATE\r
ROW(\r
    "First Date", MIN('Reporting Date'[Date]),\r
    "Last Date", MAX('Reporting Date'[Date])\r
)\r
`,k=`EVALUATE\r
ROW(\r
    "Reporting Window", [Reporting Window],\r
    "Reporting Caveat", [Reporting Caveat],\r
    "Rates In Use", [Rates In Use],\r
    "Azure Currency", CONCATENATEX(VALUES('AzureAiSpend'[Currency]), 'AzureAiSpend'[Currency], ", ")\r
)\r
`,A=`EVALUATE\r
ROW(\r
    "Cowork Rows", COUNTROWS(CreditsWeekly),\r
    "Studio Rows", COUNTROWS('Credit Consumption (Tenant)'),\r
    "Azure Rows", COUNTROWS('AzureSolutionSpend') + COUNTROWS('AzureAiSpend')\r
)\r
`,j={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{filter:`isValid(datum['Cost'])`}],mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Product`,type:`nominal`,title:null,sort:{field:`Product Sort`,order:`ascending`},axis:{labelLimit:200}},x:{field:`Cost`,type:`quantitative`,title:`Cost`,axis:{format:`,~f`,formatType:`number`}},tooltip:[{field:`Product`,type:`nominal`,title:`Product`},{field:`Cost`,type:`quantitative`,title:`Cost`,format:`,.2f`},{field:`Credits`,type:`quantitative`,title:`Credits`,format:`,.0f`},{field:`Cost Basis`,type:`nominal`,title:`Cost basis`}]}},M={"[First Date]":{name:`First Date`,displayName:`First date`},"[Last Date]":{name:`Last Date`,displayName:`Last date`}};function N(){return{connection:`cc`,filters:m,query:O,columnMetadata:M}}var P={"[Product]":{name:`Product`,displayName:`Product`},"[Product Sort]":{name:`Product Sort`,displayName:`Product sort`,format:`#,0`},"[Credits]":{name:`Credits`,displayName:`Credits`,format:`#,0`},"[Cost]":{name:`Cost`,displayName:`Cost`,format:l},"[Cost Basis]":{name:`Cost Basis`,displayName:`Cost basis`},"[Coverage]":{name:`Coverage`,displayName:`Coverage`}};function F(){return{connection:`cc`,filters:g,query:D,columnMetadata:P,vegaLiteSpec:j}}var I={"[Reporting Window]":{name:`Reporting Window`,displayName:`Selected dates`},"[Reporting Caveat]":{name:`Reporting Caveat`,displayName:`Caveat`},"[Rates In Use]":{name:`Rates In Use`,displayName:`Rates in use`},"[Azure Currency]":{name:`Azure Currency`,displayName:`Azure currency`}};function L(){return{connection:`cc`,filters:g,query:k,columnMetadata:I}}var R={"[Cowork Rows]":{name:`Cowork Rows`,displayName:`Cowork rows`,format:`#,0`},"[Studio Rows]":{name:`Studio Rows`,displayName:`Copilot Studio rows`,format:`#,0`},"[Azure Rows]":{name:`Azure Rows`,displayName:`Azure rows`,format:`#,0`}};function z(){return{connection:`cc`,filters:m,query:A,columnMetadata:R}}function B(e){return Object.keys(R).some(t=>{let n=e[t];return typeof n==`number`&&n>0})}function V(e){if(typeof e!=`string`||e.trim()===``)return;let[t,...n]=e.split(`|`).map(e=>e.trim()),r=n.join(` | `).replace(/^source\s+/i,``);return{status:t,source:r===``?void 0:r}}function pe(e){return e?.status.toLowerCase().startsWith(`date span covered`)??!1}var me=`// The report's slicer choices: each product's period, the Group By\r
// attributes, the Cowork services and the Azure cost bases.\r
EVALUATE\r
UNION(\r
    SELECTCOLUMNS('Cowork Period', "Kind", "Cowork period", "Value", 'Cowork Period'[Period], "Sort", 'Cowork Period'[Period Order]),\r
    SELECTCOLUMNS('Studio Period', "Kind", "Studio period", "Value", 'Studio Period'[Period], "Sort", 'Studio Period'[Period Order]),\r
    SELECTCOLUMNS(VALUES('Group By'[Attribute]), "Kind", "Group by", "Value", 'Group By'[Attribute], "Sort", 0),\r
    SELECTCOLUMNS(VALUES(CreditsWeekly[ServiceName]), "Kind", "Service", "Value", CreditsWeekly[ServiceName], "Sort", 0),\r
    SELECTCOLUMNS('Azure Cost Basis', "Kind", "Cost basis", "Value", 'Azure Cost Basis'[Cost Basis], "Sort", 0)\r
)\r
ORDER BY [Kind] ASC, [Sort] ASC, [Value] ASC`,he={"[Kind]":{name:`Kind`,displayName:`Kind`},"[Value]":{name:`Value`,displayName:`Value`},"[Sort]":{name:`Sort`,displayName:`Sort`,format:`#,0`}};function ge(){return{connection:`cc`,filters:m,query:me,columnMetadata:he}}var _e={"Cowork period":`coworkPeriods`,"Studio period":`studioPeriods`,"Group by":`groupBy`,Service:`services`,"Cost basis":`costBases`};function ve(e){let t={coworkPeriods:[],studioPeriods:[],groupBy:[],services:[],costBases:[]},n=e.columns.findIndex(e=>e.name===`Kind`),r=e.columns.findIndex(e=>e.name===`Value`);for(let i of e.rows){let e=_e[String(i[n])],a=i[r];e&&typeof a==`string`&&a.trim()!==``&&t[e].push(a)}return t}var ye={"Job Family":`Job family`,"Usage Intensity (Cowork)":`Usage intensity`,"Usage Intensity (Studio)":`Usage intensity`};function be(e,t){return e.filter(e=>e!==`All users`&&u(e)).filter(e=>{let n=/^Usage Intensity \((.+)\)$/i.exec(e);return!n||n[1].toLowerCase()===t.toLowerCase()}).map(e=>({value:e,label:Se(e)}))}function xe(e,t){return e.some(e=>e.value===t)?t:void 0}function Se(e){let t=/^level\s*_?(\d+)_?\s*name$/i.exec(e);return ye[e]??(t?`Org level ${t[1]}`:e)}function Ce(e){return d(`'Group By'[Attribute]`,[e??`All users`])}function we(e){return d(`'Cowork Period'[Period]`,[e])}function Te(e){return d(`'Studio Period'[Period]`,[e])}function Ee(e){return d(`CreditsWeekly[ServiceName]`,[e])}function De(e){return e===`WorkIQ`?`Work IQ`:e}function Oe(e,t){return o(`'Reporting Date'[Date]`,e,t)}function ke(e){return d(`'Azure Cost Basis'[Cost Basis]`,[e])}function Ae(e){return d(`AzureSolutionSpend[Currency]`,[e])}function je(e){return typeof e==`string`&&/^\d{4}-\d{2}-\d{2}/.test(e)?e.slice(0,10):void 0}var Me=`// Groups first, largest first, then the people inside them, so the tree\r
// keeps both orders.\r
DEFINE\r
    // The released Consumption Central templates have no policy name yet, so\r
    // the query brings its own. SUMMARIZE walks the relationship to\r
    // SpendingPolicy, so a group row covers everyone in it. The all-zero GUID\r
    // is usage outside any policy window, not a policy.\r
    MEASURE 'CoworkBilling'[ValueLens Cowork Policy Name] =\r
        VAR Assigned =\r
            FILTER(\r
                SUMMARIZE(\r
                    'CoworkBilling',\r
                    'CoworkBilling'[SpendingPolicyId],\r
                    'SpendingPolicy'[Policy Name]\r
                ),\r
                'CoworkBilling'[SpendingPolicyId] <> ""\r
                    && 'CoworkBilling'[SpendingPolicyId] <> "00000000-0000-0000-0000-000000000000"\r
            )\r
        VAR N = COUNTROWS(DISTINCT(SELECTCOLUMNS(Assigned, "PolicyId", 'CoworkBilling'[SpendingPolicyId])))\r
        VAR PolicyName = MAXX(Assigned, 'SpendingPolicy'[Policy Name])\r
        VAR PolicyId = MAXX(Assigned, 'CoworkBilling'[SpendingPolicyId])\r
        RETURN\r
            SWITCH(\r
                TRUE(),\r
                N = 1, IF(PolicyName <> "", PolicyName, "Policy " & LEFT(PolicyId, 8)),\r
                N > 1, FORMAT(N, "#,0") & " policies",\r
                NOT ISEMPTY('CoworkBilling'), "(Unassigned)"\r
            )\r
EVALUATE\r
// Every group row is kept, so the totals stay whole; the people under them\r
// stop at the top 1,000, and "Total" counts them all.\r
VAR _all =\r
    SUMMARIZECOLUMNS(\r
        ROLLUPADDISSUBTOTAL(\r
            'Group By'[Group], "Is Grand Total",\r
            // The sign-in name keeps people apart, so a blank or shared display\r
            // name cannot fold several people into one row.\r
            ROLLUPGROUP('Org'[DisplayName], 'Org'[UserPrincipalName]), "Is Group Total"\r
        ),\r
        "Users", [User Count],\r
        "Credits Used", [Cowork Total Credits Used],\r
        "Allowance Used", [Person Allowance Used %],\r
        "Prepaid Cost", [Cowork Prepaid Cost],\r
        "PAYG Cost", [Cowork PAYG Cost],\r
        "Total Cost", [Cowork Total Cost],\r
        "Policy", [ValueLens Cowork Policy Name],\r
        // The billing export's own name, for people the org data has no name for.\r
        "Billing Name", MAX('CoworkBilling'[DisplayName])\r
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
            [Credits Used], DESC,\r
            'Org'[UserPrincipalName], ASC,\r
            'Org'[DisplayName], ASC,\r
            'Group By'[Group], ASC\r
        )\r
    ),\r
    "Total", _total\r
)\r
ORDER BY\r
    [Is Grand Total] DESC,\r
    [Is Group Total] DESC,\r
    [Credits Used] DESC,\r
    'Org'[UserPrincipalName] ASC,\r
    'Org'[DisplayName] ASC,\r
    'Group By'[Group] ASC\r
`,Ne=`DEFINE\r
    // The released Consumption Central templates have no policy count yet, so\r
    // the query brings its own. The all-zero GUID is usage recorded outside any\r
    // policy window, not a policy.\r
    MEASURE 'CoworkBilling'[ValueLens Cowork Policies] =\r
        CALCULATE(\r
            DISTINCTCOUNT('CoworkBilling'[SpendingPolicyId]),\r
            KEEPFILTERS('CoworkBilling'[SpendingPolicyId] <> "00000000-0000-0000-0000-000000000000"),\r
            KEEPFILTERS('CoworkBilling'[SpendingPolicyId] <> "")\r
        )\r
EVALUATE\r
ROW(\r
    "Credits Used", [Cowork Total Credits Used],\r
    "Consuming Users", [Consuming Users],\r
    "Weekly Active Users", [Weekly Active Users],\r
    "Avg Credits Per User", DIVIDE([Cowork Total Credits Used], [Consuming Users]),\r
    "Allowance Used", [Person Allowance Used %],\r
    "Users Over Limit", [% Users Over Limit],\r
    "Policies", [ValueLens Cowork Policies],\r
    "Total Cost", [Cowork Total Cost],\r
    "Prepaid Cost", [Cowork Prepaid Cost],\r
    "PAYG Cost", [Cowork PAYG Cost],\r
    "Blended Rate", [Blended Rate $],\r
    "Avg Cost Per User", DIVIDE([Cowork Total Cost], [Consuming Users]),\r
    "Policy Headroom", [Policy Headroom],\r
    "Billing Basis", [Billing Basis],\r
    "Period Label", [Cowork Period Label]\r
)\r
`,Pe=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            CreditsWeekly[Week Index],\r
            "@Start", MIN(CreditsWeekly[MetricDate]),\r
            "@Credits", [Weekly Credits],\r
            "@Users", [Weekly Active Users],\r
            "@Prepaid", [Cowork Weekly Prepaid Cost],\r
            "@PAYG", [Cowork Weekly PAYG Cost],\r
            "@WoW", [Weekly Credits WoW %]\r
        ),\r
        NOT ISBLANK([@Credits])\r
    ),\r
    "Week Index", CreditsWeekly[Week Index],\r
    "Week Start", [@Start],\r
    "Credits", [@Credits],\r
    "Active Users", [@Users],\r
    "Prepaid Cost", [@Prepaid],\r
    "PAYG Cost", [@PAYG],\r
    "Credits WoW", [@WoW]\r
)\r
ORDER BY [Week Index] ASC\r
`,Fe={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{fold:[`Prepaid Cost`,`PAYG Cost`],as:[`Series`,`Cost`]},{filter:`isValid(datum['Cost'])`},{calculate:`datum['Series'] === 'Prepaid Cost' ? 'Prepaid' : 'Pay-as-you-go'`,as:`Billing`},{calculate:`datum['Series'] === 'Prepaid Cost' ? 1 : 2`,as:`Billing Order`},{calculate:`toDate(datum['Week Start'])`,as:`Week`},{calculate:`timeFormat(datum['Week'], '%-d %b')`,as:`Week Label`}],mark:{type:`bar`,cornerRadiusEnd:2},encoding:{x:{field:`Week Label`,type:`ordinal`,title:null,sort:{field:`Week Index`,op:`min`,order:`ascending`},axis:{labelAngle:0}},y:{field:`Cost`,type:`quantitative`,stack:`zero`,title:`Cost ($)`,axis:{format:`,~f`,formatType:`number`}},color:{field:`Billing`,type:`nominal`,title:null,sort:[`Prepaid`,`Pay-as-you-go`],legend:{orient:`top`,direction:`horizontal`}},order:{field:`Billing Order`,type:`quantitative`},tooltip:[{field:`Week`,type:`temporal`,title:`Week starting`,format:`%d %b %Y`},{field:`Billing`,type:`nominal`,title:`Billing`},{field:`Cost`,type:`quantitative`,title:`Cost`,format:`$,.2f`},{field:`Active Users`,type:`quantitative`,title:`Active users`,format:`,.0f`}]}},Ie={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{filter:`isValid(datum['Credits'])`},{calculate:`toDate(datum['Week Start'])`,as:`Week`}],encoding:{x:{field:`Week`,type:`temporal`,title:null,axis:{tickCount:{interval:`week`,step:1},labelExpr:`timeFormat(datum.value, '%-d %b')`,labelAngle:0,labelOverlap:!0}},y:{field:`Credits`,type:`quantitative`,title:`Credits`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}}},layer:[{mark:{type:`line`,interpolate:`monotone`,strokeWidth:2}},{mark:{type:`point`,filled:!0,size:44},encoding:{tooltip:[{field:`Week`,type:`temporal`,title:`Week starting`,format:`%d %b %Y`},{field:`Credits`,type:`quantitative`,title:`Credits`,format:`,.0f`},{field:`Active Users`,type:`quantitative`,title:`Active users`,format:`,.0f`},{field:`Credits WoW`,type:`quantitative`,title:`Week on week`,format:`+.1%`}]}}]},Le=`DEFINE\r
    // Cowork's credits over the selected dates, counted as the model's\r
    // Reporting Cowork Cost counts them, then priced as the Cowork section\r
    // prices them: up to the Capacity Pack balance at the prepaid rate, the\r
    // rest at pay-as-you-go. The pack applies to the credits in these dates.\r
    MEASURE 'Settings'[ValueLens Cowork Window Credits] =\r
        VAR Lo = [Reporting Start]\r
        VAR Hi = [Reporting End]\r
        RETURN\r
            CALCULATE(\r
                SUM('CreditsWeekly'[CreditsUsed]),\r
                REMOVEFILTERS('Date'),\r
                KEEPFILTERS(\r
                    FILTER(\r
                        ALL('CreditsWeekly'[MetricDate]),\r
                        'CreditsWeekly'[MetricDate] >= Lo && 'CreditsWeekly'[MetricDate] <= Hi\r
                    )\r
                )\r
            )\r
    MEASURE 'Settings'[ValueLens Cowork Window Prepaid] =\r
        VAR Used = [ValueLens Cowork Window Credits]\r
        RETURN IF(NOT ISBLANK(Used), MIN(Used, [Cowork Capacity Pack Balance Value]))\r
    MEASURE 'Settings'[ValueLens Cowork Window Cost] =\r
        VAR Used = [ValueLens Cowork Window Credits]\r
        VAR Prepaid = [ValueLens Cowork Window Prepaid]\r
        RETURN\r
            IF(\r
                NOT ISBLANK(Used),\r
                Prepaid * [Cowork Prepaid Rate Value] + (Used - Prepaid) * [Cowork PAYG Rate Value]\r
            )\r
EVALUATE\r
ROW(\r
    "Credits", [ValueLens Cowork Window Credits],\r
    "Prepaid Credits", [ValueLens Cowork Window Prepaid],\r
    "Cost", [ValueLens Cowork Window Cost]\r
)\r
`,Re={"[Credits Used]":{name:`Credits Used`,displayName:`Credits used`,format:`#,0`},"[Consuming Users]":{name:`Consuming Users`,displayName:`Consuming users`,format:`#,0`},"[Weekly Active Users]":{name:`Weekly Active Users`,displayName:`Weekly active users`,format:`#,0`},"[Avg Credits Per User]":{name:`Avg Credits Per User`,displayName:`Credits per user`,format:`#,0`},"[Allowance Used]":{name:`Allowance Used`,displayName:`Allowance used`,format:c},"[Users Over Limit]":{name:`Users Over Limit`,displayName:`Users over limit`,format:c},"[Policies]":{name:`Policies`,displayName:`Policies`,format:`#,0`},"[Total Cost]":{name:`Total Cost`,displayName:`Total cost`,format:l},"[Prepaid Cost]":{name:`Prepaid Cost`,displayName:`Prepaid`,format:l},"[PAYG Cost]":{name:`PAYG Cost`,displayName:`Pay-as-you-go`,format:l},"[Blended Rate]":{name:`Blended Rate`,displayName:`Blended rate`,format:`0.0000`},"[Avg Cost Per User]":{name:`Avg Cost Per User`,displayName:`Cost per user`,format:l},"[Policy Headroom]":{name:`Policy Headroom`,displayName:`Policy headroom`,format:`#,0`},"[Billing Basis]":{name:`Billing Basis`,displayName:`Billing basis`},"[Period Label]":{name:`Period Label`,displayName:`Period`}};function ze(){return{connection:`cc`,filters:h,query:Ne,columnMetadata:Re}}var Be={"[Week Index]":{name:`Week Index`,displayName:`Week`,format:`#,0`},"[Week Start]":{name:`Week Start`,displayName:`Week starting`},"[Credits]":{name:`Credits`,displayName:`Credits`,format:`#,0`},"[Active Users]":{name:`Active Users`,displayName:`Active users`,format:`#,0`},"[Prepaid Cost]":{name:`Prepaid Cost`,displayName:`Prepaid`,format:l},"[PAYG Cost]":{name:`PAYG Cost`,displayName:`Pay-as-you-go`,format:l},"[Credits WoW]":{name:`Credits WoW`,displayName:`Week on week`,format:c}};function Ve(e=`consumption`){return{connection:`cc`,filters:h,query:Pe,columnMetadata:Be,vegaLiteSpec:e===`cost`?Fe:Ie}}var He={"[Credits]":{name:`Credits`,displayName:`Credits used`,format:`#,0`},"[Prepaid Credits]":{name:`Prepaid Credits`,displayName:`Prepaid credits`,format:`#,0`},"[Cost]":{name:`Cost`,displayName:`Cost`,format:l}};function Ue(){return{connection:`cc`,filters:ie,query:Le,columnMetadata:He}}var H=`Group ByGroup`,U=`OrgDisplayName`,W=`OrgUserPrincipalName`,G=`Billing Name`,We=[`Users`,`Credits Used`,`Allowance Used`,`Prepaid Cost`,`PAYG Cost`,`Total Cost`,`Policy`],Ge={"Group By[Group]":{name:H,displayName:`Group`},"Org[DisplayName]":{name:U,displayName:`Person`},"Org[UserPrincipalName]":{name:W,displayName:`Sign-in name`},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[Users]":{name:`Users`,displayName:`Users`,format:`#,0`},"[Credits Used]":{name:`Credits Used`,displayName:`Credits used`,format:`#,0`},"[Allowance Used]":{name:`Allowance Used`,displayName:`Allowance used`,format:c},"[Prepaid Cost]":{name:`Prepaid Cost`,displayName:`Prepaid`,format:l},"[PAYG Cost]":{name:`PAYG Cost`,displayName:`Pay-as-you-go`,format:l},"[Total Cost]":{name:`Total Cost`,displayName:`Total cost`,format:l},"[Policy]":{name:`Policy`,displayName:`Policy`},"[Billing Name]":{name:G},...s};function K(){return{connection:`cc`,filters:h,query:Me,columnMetadata:Ge}}function q(e){return typeof e==`string`&&e.trim()!==``?e.trim():void 0}function Ke(e){return b(e,{group:H,leaf:W,leafLabel:(e,t)=>q(e)?q(t(U))??q(t(G)):void 0,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:`Who`,fields:We,blankLabel:`(No value)`})}var qe=`EVALUATE\r
VAR _all = SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Agent Bridge'[Agent Name],\r
            "@Credits", [Studio Total Credits Used],\r
            "@Share", [Group Credit Share %],\r
            "@Billable", [Total Billable Credits Used],\r
            "@Cost", [Billable Credit Cost (User)]\r
        ),\r
        NOT ISBLANK([@Credits])\r
    ),\r
    "Agent", 'Agent Bridge'[Agent Name],\r
    "Credits Used", [@Credits],\r
    "Credit Share", [@Share],\r
    "Billable Credits", [@Billable],\r
    "Estimated Cost", [@Cost]\r
)\r
VAR _total = COUNTROWS(_all)\r
RETURN\r
    ADDCOLUMNS(\r
        TOPN(1000, _all, [Credits Used], DESC, [Agent], ASC),\r
        "Total", _total\r
    )\r
ORDER BY [Credits Used] DESC, [Agent] ASC\r
`,Je=`// Copilot pay-as-you-go as billed in Azure, from every subscription a Power\r
// Platform billing policy charges. "All available days" reads every row; a\r
// shorter period ends on the Studio export's last day, like the page's other\r
// figures, or on Azure's last day when there is no export.\r
EVALUATE\r
VAR WindowDays = [Studio Period Days]\r
VAR AzureLast = CALCULATE(MAX('CopilotPaygSpend'[UsageDate]), REMOVEFILTERS('CopilotPaygSpend'))\r
VAR ExportLast = CALCULATE(MAX('Credit Consumption (Tenant)'[Usage_Date]), REMOVEFILTERS('Credit Consumption (Tenant)'))\r
VAR Hi = IF(WindowDays = 0, AzureLast, COALESCE(ExportLast, AzureLast))\r
VAR Lo = IF(WindowDays = 0, CALCULATE(MIN('CopilotPaygSpend'[UsageDate]), REMOVEFILTERS('CopilotPaygSpend')), Hi - WindowDays + 1)\r
VAR Billed = FILTER(ALL('CopilotPaygSpend'), 'CopilotPaygSpend'[UsageDate] >= Lo && 'CopilotPaygSpend'[UsageDate] <= Hi)\r
VAR Credits = FILTER(Billed, CONTAINSSTRING('CopilotPaygSpend'[Meter], "Copilot Credit"))\r
VAR Currencies = DISTINCT(SELECTCOLUMNS(Billed, "Currency", 'CopilotPaygSpend'[Currency]))\r
RETURN\r
ROW(\r
    "Studio Cost", SUMX(FILTER(Billed, 'CopilotPaygSpend'[Product] = "Copilot Studio"), 'CopilotPaygSpend'[Cost]),\r
    "Studio Credits", SUMX(FILTER(Credits, 'CopilotPaygSpend'[Product] = "Copilot Studio"), 'CopilotPaygSpend'[UsageQuantity]),\r
    "Cowork Cost", SUMX(FILTER(Billed, 'CopilotPaygSpend'[Product] = "Cowork"), 'CopilotPaygSpend'[Cost]),\r
    "Cowork Credits", SUMX(FILTER(Credits, 'CopilotPaygSpend'[Product] = "Cowork"), 'CopilotPaygSpend'[UsageQuantity]),\r
    "Other Cost", SUMX(FILTER(Billed, NOT 'CopilotPaygSpend'[Product] IN {"Copilot Studio", "Cowork"}), 'CopilotPaygSpend'[Cost]),\r
    "Total Cost", SUMX(Billed, 'CopilotPaygSpend'[Cost]),\r
    "Currency", IF(COUNTROWS(Currencies) = 1, MAXX(Currencies, [Currency])),\r
    "Currencies", CONCATENATEX(Currencies, [Currency], ", ", [Currency], ASC),\r
    "Subscriptions", COUNTROWS(DISTINCT(SELECTCOLUMNS(Billed, "Subscription", 'CopilotPaygSpend'[SubscriptionId]))),\r
    "First Date", MINX(Billed, 'CopilotPaygSpend'[UsageDate]),\r
    "Last Date", MAXX(Billed, 'CopilotPaygSpend'[UsageDate]),\r
    "Rows", COUNTROWS(Billed)\r
)\r
`,Ye=`// Each day's Copilot pay-as-you-go billed in Azure, by product, over the\r
// same window as studio-azure-billing.dax.\r
EVALUATE\r
VAR WindowDays = [Studio Period Days]\r
VAR AzureLast = CALCULATE(MAX('CopilotPaygSpend'[UsageDate]), REMOVEFILTERS('CopilotPaygSpend'))\r
VAR ExportLast = CALCULATE(MAX('Credit Consumption (Tenant)'[Usage_Date]), REMOVEFILTERS('Credit Consumption (Tenant)'))\r
VAR Hi = IF(WindowDays = 0, AzureLast, COALESCE(ExportLast, AzureLast))\r
VAR Lo = IF(WindowDays = 0, CALCULATE(MIN('CopilotPaygSpend'[UsageDate]), REMOVEFILTERS('CopilotPaygSpend')), Hi - WindowDays + 1)\r
VAR Billed = FILTER(ALL('CopilotPaygSpend'), 'CopilotPaygSpend'[UsageDate] >= Lo && 'CopilotPaygSpend'[UsageDate] <= Hi)\r
RETURN\r
SELECTCOLUMNS(\r
    FILTER(\r
        ADDCOLUMNS(\r
            SUMMARIZE(Billed, 'CopilotPaygSpend'[UsageDate], 'CopilotPaygSpend'[Product]),\r
            "@Cost", CALCULATE(SUM('CopilotPaygSpend'[Cost])),\r
            "@Credits", CALCULATE(SUM('CopilotPaygSpend'[UsageQuantity]), CONTAINSSTRING('CopilotPaygSpend'[Meter], "Copilot Credit"))\r
        ),\r
        NOT ISBLANK([@Cost])\r
    ),\r
    "Usage Date", 'CopilotPaygSpend'[UsageDate],\r
    "Product", 'CopilotPaygSpend'[Product],\r
    "Product Sort", SWITCH('CopilotPaygSpend'[Product], "Copilot Studio", 1, "Cowork", 2, 3),\r
    "Cost", [@Cost],\r
    "Credits", [@Credits]\r
)\r
ORDER BY [Usage Date] ASC, [Product Sort] ASC\r
`,Xe={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{filter:`isValid(datum['Cost'])`},{calculate:`toDate(datum['Usage Date'])`,as:`Day`}],mark:{type:`bar`,width:{expr:`max(1, 0.7 * (scale('x', 86400000) - scale('x', 0)))`}},encoding:{x:{field:`Day`,type:`temporal`,title:null,axis:{labelExpr:`timeFormat(datum.value, '%-d %b')`,labelAngle:0,labelOverlap:!0,tickCount:`week`,grid:!1}},y:{field:`Cost`,type:`quantitative`,stack:`zero`,title:`Cost`,axis:{format:`,~f`,formatType:`number`}},color:{field:`Product`,type:`nominal`,title:null,sort:{field:`Product Sort`,op:`min`,order:`ascending`},legend:{orient:`top`,direction:`horizontal`}},order:{field:`Product Sort`,type:`quantitative`},tooltip:[{field:`Day`,type:`temporal`,title:`Day`,format:`%a %d %b %Y`},{field:`Product`,type:`nominal`,title:`Product`},{field:`Cost`,type:`quantitative`,title:`Cost`,format:`,.2f`},{field:`Credits`,type:`quantitative`,title:`Credits`,format:`,.0f`}]}},Ze={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{filter:`isValid(datum['Credits'])`},{calculate:`toDate(datum['Usage Date'])`,as:`Day`}],mark:{type:`bar`,width:{expr:`max(1, 0.7 * (scale('x', 86400000) - scale('x', 0)))`}},encoding:{x:{field:`Day`,type:`temporal`,title:null,axis:{labelExpr:`timeFormat(datum.value, '%-d %b')`,labelAngle:0,labelOverlap:!0,tickCount:`week`,grid:!1}},y:{field:`Credits`,type:`quantitative`,stack:`zero`,title:`Credits`},color:{field:`Product`,type:`nominal`,title:null,sort:{field:`Product Sort`,op:`min`,order:`ascending`},legend:{orient:`top`,direction:`horizontal`}},order:{field:`Product Sort`,type:`quantitative`},tooltip:[{field:`Day`,type:`temporal`,title:`Day`,format:`%a %d %b %Y`},{field:`Product`,type:`nominal`,title:`Product`},{field:`Credits`,type:`quantitative`,title:`Credits`,format:`,.0f`},{field:`Cost`,type:`quantitative`,title:`Cost`,format:`,.2f`}]}},Qe=`EVALUATE\r
UNION(\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Credit Consumption (Agent)'[LLM_Model],\r
                "@Credits", [Studio Consumed Credits (Agent)],\r
                "@Cost", [Billable Credit Cost (Agent)]\r
            ),\r
            NOT ISBLANK([@Credits])\r
        ),\r
        "Breakdown", "Model",\r
        "Item", COALESCE('Credit Consumption (Agent)'[LLM_Model], "Not recorded"),\r
        "Credits", [@Credits],\r
        "Cost", [@Cost]\r
    ),\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Credit Consumption (Agent)'[Billable_Feature],\r
                "@Credits", [Studio Consumed Credits (Agent)],\r
                "@Cost", [Billable Credit Cost (Agent)]\r
            ),\r
            NOT ISBLANK([@Credits])\r
        ),\r
        "Breakdown", "Feature",\r
        "Item", COALESCE('Credit Consumption (Agent)'[Billable_Feature], "Not recorded"),\r
        "Credits", [@Credits],\r
        "Cost", [@Cost]\r
    )\r
)\r
ORDER BY [Breakdown] ASC, [Credits] DESC\r
`,$e={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{filter:`isValid(datum['Cost'])`}],mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Item`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:180}},x:{field:`Cost`,type:`quantitative`,title:`Estimated cost ($)`,axis:{format:`,~f`,formatType:`number`}},tooltip:[{field:`Item`,type:`nominal`,title:`Item`},{field:`Credits`,type:`quantitative`,title:`Credits`,format:`,.0f`},{field:`Cost`,type:`quantitative`,title:`Estimated cost`,format:`$,.2f`}]}},et={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{filter:`isValid(datum['Credits'])`}],mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Item`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:180}},x:{field:`Credits`,type:`quantitative`,title:`Credits`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}},tooltip:[{field:`Item`,type:`nominal`,title:`Item`},{field:`Credits`,type:`quantitative`,title:`Credits`,format:`,.0f`},{field:`Cost`,type:`quantitative`,title:`Estimated cost`,format:`$,.2f`}]}},tt=`EVALUATE\r
// How much of the user snapshot's credits the busiest users account for,\r
// from the same user rows as the top-users table, so it holds for every user\r
// rather than the top of that list. A user under more than one group counts\r
// once, with their rows summed.\r
VAR __Rows =\r
    SUMMARIZECOLUMNS(\r
        'Group By'[Group],\r
        'Credit Consumption (User)'[User Name],\r
        "@Credits", [Studio Total Credits Used]\r
    )\r
VAR __Values =\r
    FILTER(\r
        GROUPBY(\r
            SELECTCOLUMNS(\r
                __Rows,\r
                "@Person", COALESCE('Credit Consumption (User)'[User Name], ""),\r
                "@Credits", [@Credits]\r
            ),\r
            [@Person],\r
            "@Value", SUMX(CURRENTGROUP(), [@Credits])\r
        ),\r
        [@Value] > 0\r
    )\r
// The cuts lib/concentration.ts reads: every top slice's size, rounded up,\r
// and both roundings of each point on the thinned curve. Each cut's sum\r
// takes the busiest people, less any tied past the cut.\r
VAR __Total = SUMX(__Values, [@Value])\r
VAR __Count = COUNTROWS(__Values) + 0\r
VAR __Steps = MAX(1, MIN(__Count, 100))\r
VAR __Cuts =\r
    ADDCOLUMNS(\r
        FILTER(\r
            DISTINCT(\r
                UNION(\r
                    SELECTCOLUMNS({ 1, 5, 25 }, "@Count", QUOTIENT(__Count * [Value] + 99, 100)),\r
                    SELECTCOLUMNS(GENERATESERIES(1, __Steps), "@Count", QUOTIENT([Value] * __Count, __Steps)),\r
                    SELECTCOLUMNS(GENERATESERIES(1, __Steps), "@Count", QUOTIENT([Value] * __Count + __Steps - 1, __Steps))\r
                )\r
            ),\r
            [@Count] >= 1\r
        ),\r
        "@Cumulative",\r
            VAR __Top = TOPN([@Count], __Values, [@Value], DESC)\r
            VAR __Boundary = MINX(__Top, [@Value])\r
            VAR __Higher = FILTER(__Top, [@Value] > __Boundary)\r
            RETURN SUMX(__Higher, [@Value]) + ([@Count] - COUNTROWS(__Higher)) * __Boundary\r
    )\r
RETURN\r
    SELECTCOLUMNS(\r
        __Cuts,\r
        "Count", [@Count],\r
        "Cumulative", [@Cumulative],\r
        "People", __Count,\r
        "Total", __Total\r
    )\r
ORDER BY [Count]\r
`,nt=`EVALUATE\r
ROW(\r
    "Credits Consumed", [Studio Consumed Credits (Tenant)],\r
    "Active Users", [Billing Active Users],\r
    "Agents With Credits", [Billing Agents with Credits],\r
    "Avg Credits Per User", [Studio Avg Credits per User],\r
    "Avg Agents Per User", [Avg Agents per User],\r
    "Total Cost", [Total Billable Cost],\r
    "Prepaid Cost", [Studio Prepaid Cost],\r
    "PAYG Cost", [Studio PAYG Cost],\r
    "PAYG Share", [Studio PAYG Share %],\r
    "Effective Rate", [Studio Effective Rate],\r
    "Avg Cost Per User", DIVIDE([Billable Credit Cost (User)], [Billing Active Users]),\r
    "Billing Period", [Billing Period],\r
    "Period Label", [Studio Period Label],\r
    "Concentration", [Studio Concentration Summary],\r
    "Snapshot Note", [Studio Snapshot Note],\r
    "Org Match Rate", [Org Match Rate],\r
    "Org Filter Status", [Org Filter Status]\r
)\r
`,rt=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'Credit Consumption (Tenant)'[Usage_Date],\r
            "@PrepaidCredits", [Studio Prepaid Consumed],\r
            "@PAYGCredits", [Studio PAYG Consumed],\r
            "@Credits", [Studio Consumed Credits (Tenant)],\r
            "@PrepaidCost", [Studio Prepaid Cost],\r
            "@PAYGCost", [Studio PAYG Cost]\r
        ),\r
        NOT ISBLANK([@Credits])\r
    ),\r
    "Usage Date", 'Credit Consumption (Tenant)'[Usage_Date],\r
    "Prepaid Credits", [@PrepaidCredits],\r
    "PAYG Credits", [@PAYGCredits],\r
    "Credits", [@Credits],\r
    "Prepaid Cost", [@PrepaidCost],\r
    "PAYG Cost", [@PAYGCost]\r
)\r
ORDER BY [Usage Date] ASC\r
`,it={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,encoding:{x:{field:`Day`,type:`temporal`,title:null,axis:{labelExpr:`timeFormat(datum.value, '%-d %b')`,labelAngle:0,labelOverlap:!0,tickCount:`week`,grid:!1}}},layer:[{transform:[{fold:[`Prepaid Cost`,`PAYG Cost`],as:[`Series`,`Value`]},{filter:`isValid(datum['Value'])`},{calculate:`datum['Series'] === 'Prepaid Cost' ? 'Prepaid' : 'Pay-as-you-go'`,as:`Billing`},{calculate:`datum['Series'] === 'Prepaid Cost' ? 1 : 2`,as:`Billing Order`},{calculate:`toDate(datum['Usage Date'])`,as:`Day`}],mark:{type:`bar`,width:{expr:`max(1, 0.7 * (scale('x', 86400000) - scale('x', 0)))`}},encoding:{y:{field:`Value`,type:`quantitative`,stack:`zero`,title:`Cost ($)`,axis:{format:`,~f`,formatType:`number`}},color:{field:`Billing`,type:`nominal`,title:null,sort:[`Prepaid`,`Pay-as-you-go`],legend:{orient:`top`,direction:`horizontal`}},order:{field:`Billing Order`,type:`quantitative`},tooltip:[{field:`Day`,type:`temporal`,title:`Day`,format:`%a %d %b %Y`},{field:`Billing`,type:`nominal`,title:`Billing`},{field:`Value`,type:`quantitative`,title:`Cost ($)`,format:`$,.2f`},{field:`Credits`,type:`quantitative`,title:`All credits`,format:`,.0f`}]}},{transform:[{calculate:`toDate(datum['Usage Date'])`,as:`Usage Day`},{calculate:`(isValid(datum['Prepaid Cost']) ? datum['Prepaid Cost'] : 0) + (isValid(datum['PAYG Cost']) ? datum['PAYG Cost'] : 0)`,as:`Day Total`},{calculate:`utc(year(datum['Usage Day']), month(datum['Usage Day']), date(datum['Usage Day'])) / 86400000`,as:`Day Number`},{joinaggregate:[{op:`min`,field:`Day Number`,as:`First Day Number`},{op:`max`,field:`Day Number`,as:`Last Day Number`}]},{calculate:`datum['Day Number'] === datum['First Day Number'] ? sequence(datum['First Day Number'], datum['Last Day Number'] + 1) : sequence(datum['Day Number'], datum['Day Number'] + 7)`,as:`Window Days`},{flatten:[`Window Days`],as:[`Average Day Number`]},{filter:`datum['Average Day Number'] >= datum['First Day Number'] + 6 && datum['Average Day Number'] <= datum['Last Day Number']`},{calculate:`datum['Average Day Number'] - datum['Day Number'] <= 6 ? datum['Day Total'] : 0`,as:`Window Amount`},{aggregate:[{op:`sum`,field:`Window Amount`,as:`Week Total`}],groupby:[`Average Day Number`]},{calculate:`toDate(datetime(utcyear(datum['Average Day Number'] * 86400000), utcmonth(datum['Average Day Number'] * 86400000), utcdate(datum['Average Day Number'] * 86400000)))`,as:`Day`},{calculate:`datum['Week Total'] / 7`,as:`Value`}],mark:{type:`line`,color:`#605e5c`,strokeWidth:2,interpolate:`monotone`},encoding:{y:{field:`Value`,type:`quantitative`,title:`Cost ($)`,axis:{format:`,~f`,formatType:`number`}},tooltip:[{field:`Day`,type:`temporal`,title:`Day`,format:`%a %d %b %Y`},{field:`Value`,type:`quantitative`,title:`7-day average`,format:`$,.2f`}]}}]},at={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,encoding:{x:{field:`Day`,type:`temporal`,title:null,axis:{labelExpr:`timeFormat(datum.value, '%-d %b')`,labelAngle:0,labelOverlap:!0,tickCount:`week`,grid:!1}}},layer:[{transform:[{fold:[`Prepaid Credits`,`PAYG Credits`],as:[`Series`,`Value`]},{filter:`isValid(datum['Value'])`},{calculate:`datum['Series'] === 'Prepaid Credits' ? 'Prepaid' : 'Pay-as-you-go'`,as:`Billing`},{calculate:`datum['Series'] === 'Prepaid Credits' ? 1 : 2`,as:`Billing Order`},{calculate:`toDate(datum['Usage Date'])`,as:`Day`}],mark:{type:`bar`,width:{expr:`max(1, 0.7 * (scale('x', 86400000) - scale('x', 0)))`}},encoding:{y:{field:`Value`,type:`quantitative`,stack:`zero`,title:`Credits`,axis:{format:`,~f`,formatType:`number`}},color:{field:`Billing`,type:`nominal`,title:null,sort:[`Prepaid`,`Pay-as-you-go`],legend:{orient:`top`,direction:`horizontal`}},order:{field:`Billing Order`,type:`quantitative`},tooltip:[{field:`Day`,type:`temporal`,title:`Day`,format:`%a %d %b %Y`},{field:`Billing`,type:`nominal`,title:`Billing`},{field:`Value`,type:`quantitative`,title:`Credits`,format:`,.0f`},{field:`Credits`,type:`quantitative`,title:`All credits`,format:`,.0f`}]}},{transform:[{calculate:`toDate(datum['Usage Date'])`,as:`Usage Day`},{calculate:`(isValid(datum['Prepaid Credits']) ? datum['Prepaid Credits'] : 0) + (isValid(datum['PAYG Credits']) ? datum['PAYG Credits'] : 0)`,as:`Day Total`},{calculate:`utc(year(datum['Usage Day']), month(datum['Usage Day']), date(datum['Usage Day'])) / 86400000`,as:`Day Number`},{joinaggregate:[{op:`min`,field:`Day Number`,as:`First Day Number`},{op:`max`,field:`Day Number`,as:`Last Day Number`}]},{calculate:`datum['Day Number'] === datum['First Day Number'] ? sequence(datum['First Day Number'], datum['Last Day Number'] + 1) : sequence(datum['Day Number'], datum['Day Number'] + 7)`,as:`Window Days`},{flatten:[`Window Days`],as:[`Average Day Number`]},{filter:`datum['Average Day Number'] >= datum['First Day Number'] + 6 && datum['Average Day Number'] <= datum['Last Day Number']`},{calculate:`datum['Average Day Number'] - datum['Day Number'] <= 6 ? datum['Day Total'] : 0`,as:`Window Amount`},{aggregate:[{op:`sum`,field:`Window Amount`,as:`Week Total`}],groupby:[`Average Day Number`]},{calculate:`toDate(datetime(utcyear(datum['Average Day Number'] * 86400000), utcmonth(datum['Average Day Number'] * 86400000), utcdate(datum['Average Day Number'] * 86400000)))`,as:`Day`},{calculate:`datum['Week Total'] / 7`,as:`Value`}],mark:{type:`line`,color:`#605e5c`,strokeWidth:2,interpolate:`monotone`},encoding:{y:{field:`Value`,type:`quantitative`,title:`Credits`,axis:{format:`,~f`,formatType:`number`}},tooltip:[{field:`Day`,type:`temporal`,title:`Day`,format:`%a %d %b %Y`},{field:`Value`,type:`quantitative`,title:`7-day average`,format:`,.0f`}]}}]},ot=`DEFINE\r
    // The released Consumption Central templates have no per-user policy yet,\r
    // so the query brings its own. Studio bills an environment, not a person,\r
    // so the policy is found through the agents a user ran: agent ->\r
    // environment -> billing plan. Neither hop has a relationship, hence\r
    // TREATAS. An unnamed plan only shows when it is all there is.\r
    MEASURE 'Credit Consumption (User)'[ValueLens Studio Billing Policy] =\r
        VAR Agents = VALUES('Credit Consumption (User)'[Agent_Id])\r
        VAR Envs =\r
            CALCULATETABLE(\r
                VALUES('Credit Consumption (Agent)'[Environment_Id]),\r
                REMOVEFILTERS('Credit Consumption (Agent)'),\r
                TREATAS(Agents, 'Credit Consumption (Agent)'[Agent_Id])\r
            )\r
        VAR Plans =\r
            FILTER(\r
                CALCULATETABLE(\r
                    SUMMARIZE(\r
                        'Credit Consumption (Tenant)',\r
                        'Credit Consumption (Tenant)'[BillingPlan_Id],\r
                        'Credit Consumption (Tenant)'[BillingPlan_Name]\r
                    ),\r
                    REMOVEFILTERS('Credit Consumption (Tenant)'),\r
                    TREATAS(Envs, 'Credit Consumption (Tenant)'[Environment_Id])\r
                ),\r
                'Credit Consumption (Tenant)'[BillingPlan_Id] <> ""\r
                    && 'Credit Consumption (Tenant)'[BillingPlan_Id] <> "00000000-0000-0000-0000-000000000000"\r
            )\r
        VAR Named =\r
            FILTER(\r
                DISTINCT(SELECTCOLUMNS(Plans, "PlanName", 'Credit Consumption (Tenant)'[BillingPlan_Name])),\r
                [PlanName] <> ""\r
            )\r
        VAR N = COUNTROWS(Named)\r
        RETURN\r
            SWITCH(\r
                TRUE(),\r
                N = 1, MAXX(Named, [PlanName]),\r
                N > 1, FORMAT(N, "#,0") & " policies",\r
                NOT ISEMPTY(Plans), "(Unnamed policy)",\r
                NOT ISEMPTY(Agents), "(No billing policy)"\r
            )\r
EVALUATE\r
// Every group row is kept, so the totals stay whole; the people under them\r
// stop at the top 1,000, and "Total" counts them all.\r
VAR _all =\r
    SUMMARIZECOLUMNS(\r
        ROLLUPADDISSUBTOTAL(\r
            'Group By'[Group], "Is Grand Total",\r
            'Credit Consumption (User)'[User Name], "Is Group Total"\r
        ),\r
        "Credits Used", [Studio Total Credits Used],\r
        "Credit Share", [Group Credit Share %],\r
        "Billable Credits", [Total Billable Credits Used],\r
        "Estimated Cost", [Billable Credit Cost (User)],\r
        "Policy", [ValueLens Studio Billing Policy]\r
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
            [Credits Used], DESC,\r
            'Credit Consumption (User)'[User Name], ASC,\r
            'Group By'[Group], ASC\r
        )\r
    ),\r
    "Total", _total\r
)\r
ORDER BY\r
    [Is Grand Total] DESC,\r
    [Is Group Total] DESC,\r
    [Credits Used] DESC,\r
    'Credit Consumption (User)'[User Name] ASC,\r
    'Group By'[Group] ASC\r
`,st={"[Credits Consumed]":{name:`Credits Consumed`,displayName:`Credits consumed`,format:`#,0`},"[Active Users]":{name:`Active Users`,displayName:`Active users`,format:`#,0`},"[Agents With Credits]":{name:`Agents With Credits`,displayName:`Agents with credits`,format:`#,0`},"[Avg Credits Per User]":{name:`Avg Credits Per User`,displayName:`Credits per user`,format:`#,0`},"[Avg Agents Per User]":{name:`Avg Agents Per User`,displayName:`Agents per user`,format:`0.0`},"[Total Cost]":{name:`Total Cost`,displayName:`Total cost`,format:l},"[Prepaid Cost]":{name:`Prepaid Cost`,displayName:`Prepaid`,format:l},"[PAYG Cost]":{name:`PAYG Cost`,displayName:`Pay-as-you-go`,format:l},"[PAYG Share]":{name:`PAYG Share`,displayName:`Pay-as-you-go share`,format:c},"[Effective Rate]":{name:`Effective Rate`,displayName:`Effective rate`,format:`0.0000`},"[Avg Cost Per User]":{name:`Avg Cost Per User`,displayName:`Cost per user`,format:l},"[Billing Period]":{name:`Billing Period`,displayName:`Billing period`},"[Period Label]":{name:`Period Label`,displayName:`Period`},"[Concentration]":{name:`Concentration`,displayName:`Concentration`},"[Snapshot Note]":{name:`Snapshot Note`,displayName:`Snapshot note`},"[Org Match Rate]":{name:`Org Match Rate`,displayName:`Org match rate`,format:c},"[Org Filter Status]":{name:`Org Filter Status`,displayName:`Group By status`}};function ct(){return{connection:`cc`,filters:v,query:nt,columnMetadata:st}}var lt={"[Usage Date]":{name:`Usage Date`,displayName:`Day`},"[Prepaid Credits]":{name:`Prepaid Credits`,displayName:`Prepaid credits`,format:`#,0`},"[PAYG Credits]":{name:`PAYG Credits`,displayName:`Pay-as-you-go credits`,format:`#,0`},"[Credits]":{name:`Credits`,displayName:`Credits`,format:`#,0`},"[Prepaid Cost]":{name:`Prepaid Cost`,displayName:`Prepaid cost`,format:l},"[PAYG Cost]":{name:`PAYG Cost`,displayName:`Pay-as-you-go cost`,format:l}};function ut(e=`consumption`){return{connection:`cc`,filters:v,query:rt,columnMetadata:lt,vegaLiteSpec:e===`cost`?it:at}}function dt(e,t){let n=e.layer;return n?{...e,layer:n.map(e=>{let n=e.mark;return n?.type===`line`?{...e,mark:{...n,color:t}}:e})}:e}var ft={"[Studio Cost]":{name:`Studio Cost`,displayName:`Copilot Studio`,format:l},"[Studio Credits]":{name:`Studio Credits`,displayName:`Copilot Studio credits`,format:`#,0`},"[Cowork Cost]":{name:`Cowork Cost`,displayName:`Cowork`,format:l},"[Cowork Credits]":{name:`Cowork Credits`,displayName:`Cowork credits`,format:`#,0`},"[Other Cost]":{name:`Other Cost`,displayName:`Other`,format:l},"[Total Cost]":{name:`Total Cost`,displayName:`Billed in Azure`,format:l},"[Currency]":{name:`Currency`,displayName:`Currency`},"[Currencies]":{name:`Currencies`,displayName:`Currencies`},"[Subscriptions]":{name:`Subscriptions`,displayName:`Subscriptions`,format:`#,0`},"[First Date]":{name:`First Date`,displayName:`First day`},"[Last Date]":{name:`Last Date`,displayName:`Last day`},"[Rows]":{name:`Rows`,displayName:`Rows`,format:`#,0`}};function pt(){return{connection:`cc`,filters:f,query:Je,columnMetadata:ft}}var mt={"[Usage Date]":{name:`Usage Date`,displayName:`Day`},"[Product]":{name:`Product`,displayName:`Product`},"[Product Sort]":{name:`Product Sort`},"[Cost]":{name:`Cost`,displayName:`Cost`,format:l},"[Credits]":{name:`Credits`,displayName:`Credits`,format:`#,0`}};function ht(e=`consumption`){return{connection:`cc`,filters:f,query:Ye,columnMetadata:mt,vegaLiteSpec:e===`cost`?Xe:Ze}}var gt={"[Breakdown]":{name:`Breakdown`,displayName:`Breakdown`},"[Item]":{name:`Item`,displayName:`Item`},"[Credits]":{name:`Credits`,displayName:`Credits`,format:`#,0`},"[Cost]":{name:`Cost`,displayName:`Estimated cost`,format:l}};function _t(e=`consumption`){return{connection:`cc`,filters:re,query:Qe,columnMetadata:gt,vegaLiteSpec:e===`cost`?$e:et}}function vt(e,t){let n=e.columns.findIndex(e=>e.name===`Breakdown`);return{...e,rows:e.rows.filter(e=>e[n]===t)}}var yt={"[Agent]":{name:`Agent`,displayName:`Agent`},"[Credits Used]":{name:`Credits Used`,displayName:`Credits used`,format:`#,0`},"[Credit Share]":{name:`Credit Share`,displayName:`Share`,format:c},"[Billable Credits]":{name:`Billable Credits`,displayName:`Billable credits`,format:`#,0`},"[Estimated Cost]":{name:`Estimated Cost`,displayName:`Estimated cost`,format:l},...s};function bt(){return{connection:`cc`,filters:p,query:qe,columnMetadata:yt}}var J=`Group ByGroup`,Y=`Credit Consumption (User)User Name`,xt=[`Credits Used`,`Credit Share`,`Billable Credits`,`Estimated Cost`,`Policy`],St={"Group By[Group]":{name:J,displayName:`Group`},"Credit Consumption (User)[User Name]":{name:Y,displayName:`User`},"[Is Grand Total]":{name:`Is Grand Total`},"[Is Group Total]":{name:`Is Group Total`},"[Credits Used]":{name:`Credits Used`,displayName:`Credits used`,format:`#,0`},"[Credit Share]":{name:`Credit Share`,displayName:`Share`,format:c},"[Billable Credits]":{name:`Billable Credits`,displayName:`Billable credits`,format:`#,0`},"[Estimated Cost]":{name:`Estimated Cost`,displayName:`Estimated cost`,format:l},"[Policy]":{name:`Policy`,displayName:`Billing policy`},...s};function Ct(){return{connection:`cc`,filters:p,query:ot,columnMetadata:St}}function wt(){return{connection:`cc`,filters:p,query:tt,columnMetadata:i}}function Tt(e){return b(e,{group:J,leaf:Y,grandTotalFlag:`Is Grand Total`,groupTotalFlag:`Is Group Total`,label:`Who`,fields:xt,blankLabel:`(No value)`})}var Et={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{filter:`isValid(datum['Cost'])`}],mark:{type:`bar`,cornerRadiusEnd:2},encoding:{y:{field:`Item`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:200}},x:{field:`Cost`,type:`quantitative`,title:`Cost`,axis:{format:`,~f`,formatType:`number`}},tooltip:[{field:`Item`,type:`nominal`,title:`Item`},{field:`Cost`,type:`quantitative`,title:`Cost`,format:`,.2f`}]}},Dt={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,transform:[{filter:`isValid(datum['Cost'])`},{calculate:`toDate(datum['Usage Date'])`,as:`Day`}],encoding:{x:{field:`Day`,type:`temporal`,title:null,axis:{labelExpr:`timeFormat(datum.value, '%-d %b')`,labelAngle:0,labelOverlap:!0,tickCount:`week`,grid:!1}},y:{field:`Cost`,type:`quantitative`,stack:`zero`,title:`Cost`,axis:{format:`,~f`,formatType:`number`}},color:{field:`Component`,type:`nominal`,title:null,sort:{field:`Component Sort`,order:`ascending`},legend:{orient:`top`,direction:`horizontal`}},order:{field:`Component Sort`,type:`quantitative`}},layer:[{mark:{type:`area`,interpolate:`monotone`,line:!1,fillOpacity:.85}},{mark:{type:`point`,filled:!0,size:40,opacity:0},encoding:{tooltip:[{field:`Day`,type:`temporal`,title:`Day`,format:`%a %d %b %Y`},{field:`Component`,type:`nominal`,title:`Component`},{field:`Cost`,type:`quantitative`,title:`Cost`,format:`,.2f`}]}}]},Ot=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS('AzureSolutionSpend'[ServiceName], "@Cost", [Azure Selected Cost]),\r
        NOT ISBLANK([@Cost])\r
    ),\r
    "Item", COALESCE('AzureSolutionSpend'[ServiceName], "Not recorded"),\r
    "Cost", [@Cost]\r
)\r
ORDER BY [Cost] DESC\r
`,kt=`EVALUATE\r
VAR _days =\r
    SUMMARIZECOLUMNS(\r
        'AzureSolutionSpend'[UsageDate],\r
        "@Model", [Azure Model Cost],\r
        "@Service", [Azure AI Service Cost],\r
        "@Supporting", [Azure Supporting Cost]\r
    )\r
RETURN\r
    FILTER(\r
        UNION(\r
            SELECTCOLUMNS(_days, "Usage Date", 'AzureSolutionSpend'[UsageDate], "Component", "Models", "Component Sort", 1, "Cost", [@Model]),\r
            SELECTCOLUMNS(_days, "Usage Date", 'AzureSolutionSpend'[UsageDate], "Component", "AI services", "Component Sort", 2, "Cost", [@Service]),\r
            SELECTCOLUMNS(_days, "Usage Date", 'AzureSolutionSpend'[UsageDate], "Component", "Supporting", "Component Sort", 3, "Cost", [@Supporting])\r
        ),\r
        NOT ISBLANK([Cost])\r
    )\r
ORDER BY [Usage Date] ASC, [Component Sort] ASC\r
`,At=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'AzureSolutionSpend'[ResourceName],\r
            'AzureSolutionSpend'[Application],\r
            'AzureSolutionSpend'[ServiceName],\r
            'AzureSolutionSpend'[DepartmentTag],\r
            "@Cost", [Azure Selected Cost]\r
        ),\r
        NOT ISBLANK([@Cost])\r
    ),\r
    "Resource", 'AzureSolutionSpend'[ResourceName],\r
    "Application", 'AzureSolutionSpend'[Application],\r
    "Service", 'AzureSolutionSpend'[ServiceName],\r
    "Department Tag", 'AzureSolutionSpend'[DepartmentTag],\r
    "Cost", [@Cost]\r
)\r
ORDER BY [Cost] DESC\r
`,jt=`EVALUATE\r
ROW(\r
    "Selected Cost", [Azure Selected Cost],\r
    "Model Share", [Azure Model Share %],\r
    "Supporting Cost", [Azure Supporting Cost],\r
    "AI Requests", [Azure AI Requests],\r
    "Tagged Allocation", [Azure Tagged Allocation %],\r
    "Tokens M", [Azure Total Tokens (M)],\r
    "Speech Hours", [Azure Speech Hours],\r
    "Document Pages", [Azure Document Pages],\r
    "Generated Images", [Azure Generated Images],\r
    "Cost Per 1M Tokens", [Azure Cost per 1M PAYG Tokens],\r
    "Spend Context", [Azure Spend Context]\r
)\r
`,Mt=`// Which Azure source the page can read: the whole-solution feed when it is\r
// loaded, otherwise the Foundry model spend export.\r
EVALUATE\r
ROW(\r
    "Solution Rows", COUNTROWS('AzureSolutionSpend'),\r
    "Solution Currencies", CONCATENATEX(VALUES('AzureSolutionSpend'[Currency]), 'AzureSolutionSpend'[Currency], "|", 'AzureSolutionSpend'[Currency], ASC),\r
    "Foundry Rows", COUNTROWS('AzureAiSpend'),\r
    "Foundry Currency", CONCATENATEX(VALUES('AzureAiSpend'[Currency]), 'AzureAiSpend'[Currency], ", ")\r
)\r
`,Nt=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS('AzureAiSpend'[Model], "@Cost", [Foundry Cost], "@Tokens", [Foundry Tokens (M)]),\r
        NOT ISBLANK([@Cost])\r
    ),\r
    "Item", COALESCE('AzureAiSpend'[Model], "Not recorded"),\r
    "Cost", [@Cost],\r
    "Tokens M", [@Tokens]\r
)\r
ORDER BY [Cost] DESC\r
`,Pt=`EVALUATE\r
VAR _days =\r
    SUMMARIZECOLUMNS(\r
        'AzureAiSpend'[UsageDate],\r
        "@Input", [Foundry Input Cost],\r
        "@Output", [Foundry Output Cost]\r
    )\r
RETURN\r
    FILTER(\r
        UNION(\r
            SELECTCOLUMNS(_days, "Usage Date", 'AzureAiSpend'[UsageDate], "Component", "Input tokens", "Component Sort", 1, "Cost", [@Input]),\r
            SELECTCOLUMNS(_days, "Usage Date", 'AzureAiSpend'[UsageDate], "Component", "Output tokens", "Component Sort", 2, "Cost", [@Output])\r
        ),\r
        NOT ISBLANK([Cost])\r
    )\r
ORDER BY [Usage Date] ASC, [Component Sort] ASC\r
`,Ft=`EVALUATE\r
SELECTCOLUMNS(\r
    FILTER(\r
        SUMMARIZECOLUMNS(\r
            'AzureAiSpend'[ResourceName],\r
            'AzureAiSpend'[ResourceGroup],\r
            'AzureAiSpend'[Model],\r
            'AzureAiSpend'[DepartmentTag],\r
            "@Cost", [Foundry Cost],\r
            "@Tokens", [Foundry Tokens (M)]\r
        ),\r
        NOT ISBLANK([@Cost])\r
    ),\r
    "Resource", 'AzureAiSpend'[ResourceName],\r
    "Resource Group", 'AzureAiSpend'[ResourceGroup],\r
    "Model", 'AzureAiSpend'[Model],\r
    "Department Tag", 'AzureAiSpend'[DepartmentTag],\r
    "Cost", [@Cost],\r
    "Tokens M", [@Tokens]\r
)\r
ORDER BY [Cost] DESC\r
`,It=`EVALUATE\r
ROW(\r
    "Cost", [Foundry Cost],\r
    "Input Cost", [Foundry Input Cost],\r
    "Output Cost", [Foundry Output Cost],\r
    "Output Share", [Foundry Output Cost Share %],\r
    "Tokens M", [Foundry Tokens (M)],\r
    "Cost Per 1M Tokens", [Foundry Cost per 1M Tokens],\r
    "AI Requests", [AI Requests],\r
    "Tokens Per Request", [Tokens per Request],\r
    "Daily Run Rate", [Foundry Daily Run Rate],\r
    "Cost Per Month", [Foundry Cost /mo],\r
    "Days Observed", [Foundry Days Observed],\r
    "PTU Verdict", [PTU Verdict]\r
)\r
`,X=Dt,Z=Et,Lt={"[Solution Rows]":{name:`Solution Rows`,displayName:`Solution rows`,format:`#,0`},"[Solution Currencies]":{name:`Solution Currencies`,displayName:`Solution currencies`},"[Foundry Rows]":{name:`Foundry Rows`,displayName:`Foundry rows`,format:`#,0`},"[Foundry Currency]":{name:`Foundry Currency`,displayName:`Foundry currency`}};function Rt(){return{connection:`cc`,filters:m,query:Mt,columnMetadata:Lt}}function zt(e){return(r(e,`[Solution Rows]`)??0)>0?{kind:`solution`,currencies:(n(e,`[Solution Currencies]`)??``).split(`|`).map(e=>e.trim()).filter(e=>e!==``)}:(r(e,`[Foundry Rows]`)??0)>0?{kind:`foundry`,currency:n(e,`[Foundry Currency]`)}:{kind:`none`}}var Bt={"[Selected Cost]":{name:`Selected Cost`,displayName:`Azure cost`,format:l},"[Model Share]":{name:`Model Share`,displayName:`Model share`,format:c},"[Supporting Cost]":{name:`Supporting Cost`,displayName:`Supporting cost`,format:l},"[AI Requests]":{name:`AI Requests`,displayName:`AI requests`,format:`#,0`},"[Tagged Allocation]":{name:`Tagged Allocation`,displayName:`Tagged allocation`,format:c},"[Tokens M]":{name:`Tokens M`,displayName:`Tokens (M)`,format:a},"[Speech Hours]":{name:`Speech Hours`,displayName:`Speech hours`,format:a},"[Document Pages]":{name:`Document Pages`,displayName:`Document pages`,format:`#,0`},"[Generated Images]":{name:`Generated Images`,displayName:`Generated images`,format:`#,0`},"[Cost Per 1M Tokens]":{name:`Cost Per 1M Tokens`,displayName:`Cost per 1M tokens`,format:l},"[Spend Context]":{name:`Spend Context`,displayName:`Spend context`}};function Vt(){return{connection:`cc`,filters:f,query:jt,columnMetadata:Bt}}var Q={"[Usage Date]":{name:`Usage Date`,displayName:`Day`},"[Component]":{name:`Component`,displayName:`Component`},"[Component Sort]":{name:`Component Sort`,displayName:`Component sort`,format:`#,0`},"[Cost]":{name:`Cost`,displayName:`Cost`,format:l}};function Ht(){return{connection:`cc`,filters:f,query:kt,columnMetadata:Q,vegaLiteSpec:X}}var Ut={"[Item]":{name:`Item`,displayName:`Service`},"[Cost]":{name:`Cost`,displayName:`Cost`,format:l}};function Wt(){return{connection:`cc`,filters:f,query:Ot,columnMetadata:Ut,vegaLiteSpec:Z}}var Gt={"[Resource]":{name:`Resource`,displayName:`Resource`},"[Application]":{name:`Application`,displayName:`Application`},"[Service]":{name:`Service`,displayName:`Service`},"[Department Tag]":{name:`Department Tag`,displayName:`Department tag`},"[Cost]":{name:`Cost`,displayName:`Cost`,format:l}};function Kt(){return{connection:`cc`,filters:f,query:At,columnMetadata:Gt}}var qt={"[Cost]":{name:`Cost`,displayName:`Foundry cost`,format:l},"[Input Cost]":{name:`Input Cost`,displayName:`Input tokens`,format:l},"[Output Cost]":{name:`Output Cost`,displayName:`Output tokens`,format:l},"[Output Share]":{name:`Output Share`,displayName:`Output share`,format:c},"[Tokens M]":{name:`Tokens M`,displayName:`Tokens (M)`,format:a},"[Cost Per 1M Tokens]":{name:`Cost Per 1M Tokens`,displayName:`Cost per 1M tokens`,format:l},"[AI Requests]":{name:`AI Requests`,displayName:`AI requests`,format:`#,0`},"[Tokens Per Request]":{name:`Tokens Per Request`,displayName:`Tokens per request`,format:`#,0`},"[Daily Run Rate]":{name:`Daily Run Rate`,displayName:`Daily run rate`,format:l},"[Cost Per Month]":{name:`Cost Per Month`,displayName:`Cost per month`,format:l},"[Days Observed]":{name:`Days Observed`,displayName:`Days observed`,format:`#,0`},"[PTU Verdict]":{name:`PTU Verdict`,displayName:`Provisioned capacity`}};function Jt(){return{connection:`cc`,filters:f,query:It,columnMetadata:qt}}function Yt(){return{connection:`cc`,filters:f,query:Pt,columnMetadata:Q,vegaLiteSpec:X}}var Xt={"[Item]":{name:`Item`,displayName:`Model`},"[Cost]":{name:`Cost`,displayName:`Cost`,format:l},"[Tokens M]":{name:`Tokens M`,displayName:`Tokens (M)`,format:a}};function Zt(){return{connection:`cc`,filters:f,query:Nt,columnMetadata:Xt,vegaLiteSpec:Z}}var Qt={"[Resource]":{name:`Resource`,displayName:`Resource`},"[Resource Group]":{name:`Resource Group`,displayName:`Resource group`},"[Model]":{name:`Model`,displayName:`Model`},"[Department Tag]":{name:`Department Tag`,displayName:`Department tag`},"[Cost]":{name:`Cost`,displayName:`Cost`,format:l},"[Tokens M]":{name:`Tokens M`,displayName:`Tokens (M)`,format:a}};function $t(){return{connection:`cc`,filters:f,query:Ft,columnMetadata:Qt}}var en=`EVALUATE\r
VAR __Date = MAX('Foundry Resources'[SnapshotDate])\r
VAR __Foundry = FILTER('Foundry Resources', 'Foundry Resources'[SnapshotDate] = __Date)\r
VAR __Accounts = FILTER(__Foundry, NOT ('Foundry Resources'[IsProject] = TRUE()))\r
VAR __Spend =\r
    FILTER(\r
        ADDCOLUMNS(\r
            FILTER(\r
                VALUES('AzureSolutionSpend'[ResourceId]),\r
                CONTAINSSTRING('AzureSolutionSpend'[ResourceId], "/providers/microsoft.cognitiveservices/")\r
                    || CONTAINSSTRING('AzureSolutionSpend'[ResourceId], "/providers/microsoft.machinelearningservices/")\r
            ),\r
            "@Id", LOWER('AzureSolutionSpend'[ResourceId]),\r
            "@Cost", [Azure Selected Cost]\r
        ),\r
        NOT ISBLANK([@Cost])\r
    )\r
VAR __Covered = CALCULATETABLE(VALUES('AzureSolutionSpend'[SubscriptionId]), REMOVEFILTERS('AzureSolutionSpend'[Currency]))\r
RETURN\r
    SELECTCOLUMNS(\r
        GENERATE(\r
            __Accounts,\r
            VAR __Id = LOWER('Foundry Resources'[ResourceId])\r
            VAR __Projects =\r
                COUNTROWS(\r
                    FILTER(\r
                        __Foundry,\r
                        'Foundry Resources'[IsProject] = TRUE() && LOWER('Foundry Resources'[AccountId]) = __Id\r
                    )\r
                )\r
            VAR __Cost = SUMX(FILTER(__Spend, [@Id] = __Id || LEFT([@Id], LEN(__Id) + 1) = __Id & "/"), [@Cost])\r
            RETURN ROW("@Projects", __Projects + 0, "@Cost", __Cost)\r
        ),\r
        "Resource", 'Foundry Resources'[ResourceName],\r
        "Kind", IF('Foundry Resources'[Kind] = "", 'Foundry Resources'[ResourceType], 'Foundry Resources'[Kind]),\r
        "Resource Group", 'Foundry Resources'[ResourceGroup],\r
        "Subscription", 'Foundry Resources'[SubscriptionId],\r
        "Projects", [@Projects],\r
        "Network", IF('Foundry Resources'[PublicNetwork] = TRUE(), "Public", "Private"),\r
        "Cost Export", IF('Foundry Resources'[SubscriptionId] IN __Covered, "Covered", "Not covered"),\r
        "Cost", [@Cost]\r
    )\r
ORDER BY [Cost] DESC, [Resource] ASC\r
`,tn={"[Resource]":{name:`Resource`,displayName:`Foundry resource`},"[Kind]":{name:`Kind`,displayName:`Kind`},"[Resource Group]":{name:`Resource Group`,displayName:`Resource group`},"[Subscription]":{name:`Subscription`,displayName:`Subscription`},"[Projects]":{name:`Projects`,displayName:`Projects`,format:`#,0`},"[Network]":{name:`Network`,displayName:`Network`},"[Cost Export]":{name:`Cost Export`,displayName:`Cost export`},"[Cost]":{name:`Cost`,displayName:`Cost`,format:l}};function nn(){return{connection:`cc`,filters:f,query:en,columnMetadata:tn}}function rn(e){if(!e||e.rows.length===0)return;let t=t=>e.columns.findIndex(e=>e.name===t),[n,r,i,a,o]=[t(`Projects`),t(`Network`),t(`Cost Export`),t(`Cost`),t(`Subscription`)],s=e.rows.filter(e=>e[i]===`Not covered`);return{accounts:e.rows.length,projects:e.rows.reduce((e,t)=>e+(Number(t[n])||0),0),publicNetwork:e.rows.filter(e=>e[r]===`Public`).length,cost:e.rows.reduce((e,t)=>e+(Number(t[a])||0),0),uncoveredSubscriptions:[...new Set(s.map(e=>String(e[o]??``)).filter(Boolean))].sort(),uncoveredAccounts:s.length}}var an={title:`Foundry inventory isn't loaded`,description:`Turn on Azure Resource Graph in the installer to see the cost of each Foundry account and project, and the subscriptions the cost export misses. It fills in after the next load and model refresh.`};function on(e,t){if(e.length===0)return;let n=e.length<=3?`: ${e.join(`, `)}`:``;return`${t} Foundry ${t===1?`resource sits`:`resources sit`} in ${e.length} ${e.length===1?`subscription`:`subscriptions`} the Azure cost export doesn't cover${n}. Add ${e.length===1?`it`:`them`} to the export's scope to see what ${t===1?`it costs`:`they cost`}.`}function $(e){let{status:t,saved:n}=C();return(0,x.useMemo)(()=>t===`loading`&&oe(e)?``:ae(e,n??void 0),[e,t,n])}function sn(e,t=[],n=[]){let r=$(e.query);return le({connection:e.connection,query:r,columnMetadata:e.columnMetadata,filters:e.filters??m},t,n)}function cn(e,t,n=[],r=[]){let i=$(e.query);return ce({connection:e.connection,query:i,columnMetadata:e.columnMetadata,filters:e.filters??m},t,n,r)}function ln(e,t=[],n=[]){let r=$(e.query);return ue({connection:e.connection,query:r,filters:e.filters??m},t,n)}export{V as $,ze as A,je as B,wt as C,Tt as D,Ct as E,ge as F,De as G,ve as H,ke as I,N as J,Te as K,we as L,Ue as M,Ke as N,dt as O,Ae as P,pe as Q,be as R,_t as S,ut as T,Oe as U,xe as V,Ee as W,z as X,L as Y,B as Z,Jt as _,nn as a,pt as b,zt as c,Kt as d,E as et,Vt as f,$t as g,Yt as h,an as i,Ve as j,K as k,Wt as l,Zt as m,sn as n,rn as o,Rt as p,F as q,cn as r,on as s,ln as t,C as tt,Ht as u,vt as v,ct as w,ht as x,bt as y,Ce as z};