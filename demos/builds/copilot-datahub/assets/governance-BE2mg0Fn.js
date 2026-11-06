import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{d as t,n,o as r,t as i,u as a,v as o,y as s}from"./createLucideIcon-CpejIyV8.js";import{i as c,n as l,r as u,t as d}from"./model-requirements-d_HapCh6.js";import{ot as ee,p as f}from"./utils-BJOTqCrL.js";import{i as te,n as p,r as m,t as h}from"./report-panels-DfmE_PFh.js";import{n as g}from"./theme.context-C3NNi3i9.js";import{t as _}from"./dist-BYOWUv_q.js";import{$ as v,A as ne,C as re,E as y,Q as ie,T as ae,Z as oe,et as b,w as x,x as S}from"./task-times.context-DLW2wtXN.js";import{n as C}from"./source-availability.context-B5FH_5Cc.js";import{i as se}from"./stage-filter.context-9jwLd2jm.js";import{S as ce,i as le,p as ue,s as de,x as fe}from"./root-DZorRZKV.js";import{n as w,o as pe,r as T,s as me}from"./headlined-CYyaVtMI.js";import{n as E}from"./use-filtered-query-B0Fhqoxi.js";import{t as D}from"./section-r2iBDg60.js";import{n as he,r as ge,t as _e}from"./color-scale-DTyjSAgS.js";import{r as O,t as k}from"./use-table-query-X_m8aLWs.js";import{i as A,r as ve}from"./tree-grid-Do3PEd5F.js";import{t as ye}from"./not-filtered-hint-ClNymjUZ.js";import{i as be,r as xe}from"./list-total-DvIVKMDg.js";import{a as Se,n as Ce}from"./heat-BkWG91O5.js";import{a as we,o as Te}from"./agents-Ctb-HMb2.js";var Ee={name:`shield-alert`,size:24,node:[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`M12 8v4`,key:`1got3b`}],[`path`,{d:`M12 16h.01`,key:`1drbdi`}]]};Ee.node;var De=i(Ee),Oe={name:`unlink`,size:24,node:[[`path`,{d:`m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71`,key:`yqzxt4`}],[`path`,{d:`m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71`,key:`4qinb0`}],[`line`,{x1:`8`,x2:`8`,y1:`2`,y2:`5`,key:`1041cp`}],[`line`,{x1:`2`,x2:`5`,y1:`8`,y2:`8`,key:`14m1p5`}],[`line`,{x1:`16`,x2:`16`,y1:`19`,y2:`22`,key:`rzdirn`}],[`line`,{x1:`19`,x2:`22`,y1:`16`,y2:`16`,key:`ox905f`}]]};Oe.node;var ke=i(Oe),Ae=`EVALUATE\r
SELECTCOLUMNS(\r
    SUMMARIZECOLUMNS(\r
        'Agents 365'[Agent Lifecycle Order],\r
        'Agents 365'[Agent Lifecycle],\r
        'Agents 365'[Agent Type Label],\r
        "@Agents", [Agent Registry Records]\r
    ),\r
    "Lifecycle Order", 'Agents 365'[Agent Lifecycle Order],\r
    "Lifecycle", 'Agents 365'[Agent Lifecycle],\r
    "Type", 'Agents 365'[Agent Type Label],\r
    "Agents", [@Agents]\r
)\r
ORDER BY [Lifecycle Order], [Agents] DESC`,je={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},encoding:{y:{field:`Lifecycle`,type:`nominal`,title:null,sort:{field:`Lifecycle Order`,op:`min`,order:`ascending`},axis:{labelLimit:200}},x:{field:`Agents`,type:`quantitative`,title:`Agents`,stack:`zero`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}},color:{field:`Type`,type:`nominal`,title:`Agent type`,legend:{orient:`top`,direction:`horizontal`,columns:3,title:null,labelLimit:180}},order:{field:`Agents`,type:`quantitative`,sort:`descending`},tooltip:[{field:`Lifecycle`,type:`nominal`,title:`Lifecycle`},{field:`Type`,type:`nominal`,title:`Agent type`},{field:`Agents`,type:`quantitative`,title:`Agents`,format:`,.0f`}]}},Me={"[Lifecycle Order]":{name:`Lifecycle Order`,displayName:`Lifecycle order`},"[Lifecycle]":{name:`Lifecycle`,displayName:`Lifecycle`},"[Type]":{name:`Type`,displayName:`Agent type`},"[Agents]":{name:`Agents`,displayName:`Agents`,format:`#,0`}},Ne={disableStackedDataLabels:!0,disableLegendTruncation:!0};function Pe(){return{connection:`vl`,query:Ae,columnMetadata:Me,capabilities:Ne,vegaLiteSpec:je}}var j=e(n(),1);function Fe(e){let t=(0,j.useMemo)(()=>c(e),[e]),{data:n,error:r}=ne({connection:e.model,query:t});return(0,j.useMemo)(()=>u(e,{loaded:n?.status===`success`,error:n?.status===`error`?n.error.message:r?.message}),[n,r,e])}function M(e){let t=d[e],n=Fe(t[0]);return(0,j.useMemo)(()=>l([n]),[n])}var Ie=`Without Agent 365, this view covers Copilot Studio agents from Azure Resource Graph. Microsoft and partner agents, descriptions, publisher, sensitivity labels and where agents are available aren't included.`,N=`'Agents 365'[Owner account]`,Le=`IF(TRIM(COALESCE(${N}, "")) = "", 'Agents 365'[Owner account (Resource Graph)], ${N})`;function P(e,t){return t===`registryOwnerFallback`?e.split(N).join(Le):e}function F(e){return e===`resourceGraph`?v:oe}var Re=`EVALUATE\r
VAR __Tenant =\r
    FILTER(\r
        'Agents 365',\r
        NOT (LOWER(TRIM(COALESCE('Agents 365'[Created in], ""))) IN {"", "not available"})\r
    )\r
RETURN\r
    ROW(\r
        "Tenant Agents", COUNTROWS(__Tenant) + 0,\r
        "Needs Review", COUNTROWS(FILTER(__Tenant, NOT ISBLANK('Agents 365'[Governance Flags]))) + 0,\r
        "No Sign In", COUNTROWS(FILTER(__Tenant, CONTAINSSTRING('Agents 365'[Governance Flags], "No sign-in required"))) + 0,\r
        "Owner Left", COUNTROWS(FILTER(__Tenant, CONTAINSSTRING('Agents 365'[Governance Flags], "Owner has left"))) + 0,\r
        "No Owner", COUNTROWS(FILTER(__Tenant, CONTAINSSTRING('Agents 365'[Governance Flags], "No owner on record"))) + 0,\r
        "Org Wide Org Data", COUNTROWS(FILTER(__Tenant, CONTAINSSTRING('Agents 365'[Governance Flags], "Org-wide with org data"))) + 0,\r
        "Shared Unused", COUNTROWS(FILTER(__Tenant, CONTAINSSTRING('Agents 365'[Governance Flags], "Shared, no recorded use"))) + 0,\r
        "Org Wide", COUNTROWS(FILTER(__Tenant, 'Agents 365'[Sharing Scope] = "Whole organisation")) + 0,\r
        "Owners Checked", COUNTROWS(FILTER(__Tenant, NOT ISBLANK('Agents 365'[Owner account]))) + 0\r
    )\r
`,ze=`EVALUATE\r
VAR __Date = MAX('Agent Configuration'[SnapshotDate])\r
VAR __Agents = FILTER('Agent Configuration', 'Agent Configuration'[SnapshotDate] = __Date)\r
RETURN\r
    ROW(\r
        "Tenant Agents", COUNTROWS(__Agents) + 0,\r
        "Seen In Use", COUNTROWS(FILTER(__Agents, COALESCE('Agent Configuration'[Total Users], 0) > 0)) + 0,\r
        "Needs Review", COUNTROWS(FILTER(__Agents, NOT ISBLANK('Agent Configuration'[Governance Flags]))) + 0,\r
        "No Sign In", COUNTROWS(FILTER(__Agents, CONTAINSSTRING('Agent Configuration'[Governance Flags], "No sign-in required"))) + 0,\r
        "Owner Left", COUNTROWS(FILTER(__Agents, CONTAINSSTRING('Agent Configuration'[Governance Flags], "Owner has left"))) + 0,\r
        "No Owner", COUNTROWS(FILTER(__Agents, CONTAINSSTRING('Agent Configuration'[Governance Flags], "No owner on record"))) + 0,\r
        "Org Wide Org Data", COUNTROWS(FILTER(__Agents, CONTAINSSTRING('Agent Configuration'[Governance Flags], "Org-wide with org data"))) + 0,\r
        "Shared Unused", COUNTROWS(FILTER(__Agents, CONTAINSSTRING('Agent Configuration'[Governance Flags], "Shared, no recorded use"))) + 0,\r
        "Org Wide", COUNTROWS(FILTER(__Agents, 'Agent Configuration'[Sharing Scope] = "Whole organisation")) + 0,\r
        "Owners Checked", COUNTROWS(FILTER(__Agents, NOT ISBLANK('Agent Configuration'[Owner account]))) + 0\r
    )\r
`,Be={"[Tenant Agents]":{name:`Tenant Agents`,displayName:`Built in this tenant`,format:`#,0`},"[Needs Review]":{name:`Needs Review`,displayName:`Need a review`,format:`#,0`},"[No Sign In]":{name:`No Sign In`,displayName:`No sign-in required`,format:`#,0`},"[Owner Left]":{name:`Owner Left`,displayName:`Owner has left`,format:`#,0`},"[No Owner]":{name:`No Owner`,displayName:`No owner on record`,format:`#,0`},"[Org Wide Org Data]":{name:`Org Wide Org Data`,displayName:`Org-wide with org data`,format:`#,0`},"[Shared Unused]":{name:`Shared Unused`,displayName:`Shared, no recorded use`,format:`#,0`},"[Org Wide]":{name:`Org Wide`,displayName:`Shared org-wide`,format:`#,0`},"[Owners Checked]":{name:`Owners Checked`,displayName:`Owners checked`,format:`#,0`}},Ve={...Be,"[Tenant Agents]":{name:`Tenant Agents`,displayName:`Copilot Studio agents`,format:`#,0`},"[Seen In Use]":{name:`Seen In Use`,displayName:`Seen in use`,format:`#,0`}};function I(e=`registry`){return e===`resourceGraph`?{connection:`vl`,query:ze,columnMetadata:Ve,filters:F(e)}:{connection:`vl`,query:P(Re,e),columnMetadata:Be,filters:F(e)}}var He=`EVALUATE\r
VAR __Live =\r
    FILTER(\r
        'Agents 365',\r
        NOT (LOWER(TRIM(COALESCE('Agents 365'[Created in], ""))) IN {"", "not available"})\r
            && NOT (LOWER(TRIM(COALESCE('Agents 365'[Is Blocked], ""))) IN {"true", "yes", "1"})\r
    )\r
RETURN\r
    SELECTCOLUMNS(\r
        GROUPBY(\r
            __Live,\r
            'Agents 365'[Sharing Scope],\r
            'Agents 365'[Data Access],\r
            "@Agents", COUNTX(CURRENTGROUP(), 1),\r
            "@Unused", SUMX(CURRENTGROUP(), IF(COALESCE('Agents 365'[Total Users], 0) = 0, 1, 0))\r
        ),\r
        "Scope Order",\r
            SWITCH(\r
                'Agents 365'[Sharing Scope],\r
                "Whole organisation", 1,\r
                "Specific people or groups", 2,\r
                "Not shared", 3,\r
                4\r
            ),\r
        "Sharing Scope", COALESCE('Agents 365'[Sharing Scope], "Not stated"),\r
        "Access Order",\r
            SWITCH(\r
                'Agents 365'[Data Access],\r
                "Organisation content", 1,\r
                "Uploaded files only", 2,\r
                "None declared", 3,\r
                4\r
            ),\r
        "Data Access", 'Agents 365'[Data Access],\r
        "Agents", [@Agents],\r
        "Unused Agents", [@Unused]\r
    )\r
ORDER BY [Scope Order], [Access Order]\r
`,Ue=`EVALUATE\r
VAR __Date = MAX('Agent Configuration'[SnapshotDate])\r
VAR __Live =\r
    FILTER(\r
        'Agent Configuration',\r
        'Agent Configuration'[SnapshotDate] = __Date\r
            && NOT ('Agent Configuration'[IsQuarantined] = TRUE())\r
    )\r
RETURN\r
    SELECTCOLUMNS(\r
        GROUPBY(\r
            __Live,\r
            'Agent Configuration'[Sharing Scope],\r
            'Agent Configuration'[Data Access],\r
            "@Agents", COUNTX(CURRENTGROUP(), 1),\r
            "@Unused", SUMX(CURRENTGROUP(), IF(COALESCE('Agent Configuration'[Total Users], 0) = 0, 1, 0))\r
        ),\r
        "Scope Order",\r
            SWITCH(\r
                'Agent Configuration'[Sharing Scope],\r
                "Whole organisation", 1,\r
                "Specific people or groups", 2,\r
                "Not shared", 3,\r
                4\r
            ),\r
        "Sharing Scope", COALESCE('Agent Configuration'[Sharing Scope], "Not stated"),\r
        "Access Order",\r
            SWITCH(\r
                'Agent Configuration'[Data Access],\r
                "Organisation content", 1,\r
                "Uploaded files only", 2,\r
                "None declared", 3,\r
                4\r
            ),\r
        "Data Access", 'Agent Configuration'[Data Access],\r
        "Agents", [@Agents],\r
        "Unused Agents", [@Unused]\r
    )\r
ORDER BY [Scope Order], [Access Order]\r
`,We={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,encoding:{x:{field:`Data Access`,type:`ordinal`,title:`What it can read`,sort:{field:`Access Order`,op:`min`,order:`ascending`},axis:{orient:`top`,labelAngle:0,labelPadding:8,labelLimit:160}},y:{field:`Sharing Scope`,type:`ordinal`,title:null,sort:{field:`Scope Order`,op:`min`,order:`ascending`},axis:{labelLimit:200,labelPadding:8}},tooltip:[{field:`Sharing Scope`,type:`nominal`,title:`Shared with`},{field:`Data Access`,type:`nominal`,title:`Can read`},{field:`Agents`,type:`quantitative`,title:`Agents`,format:`,.0f`},{field:`Unused Agents`,type:`quantitative`,title:`No recorded use`,format:`,.0f`}]},layer:[{mark:{type:`rect`},encoding:{color:{field:`Agents`,type:`quantitative`,title:null,scale:{zero:!0,nice:!1},legend:null}}},{transform:[{filter:`datum['Agents'] > 0`}],mark:{type:`text`,baseline:`middle`,align:`center`,fontWeight:600,fontSize:12},encoding:{text:{field:`Agents`,type:`quantitative`,format:`,.0f`}}}],config:{view:{stroke:null},axis:{domain:!1,ticks:!1}}},Ge={"[Scope Order]":{name:`Scope Order`,displayName:`Scope order`},"[Sharing Scope]":{name:`Sharing Scope`,displayName:`Shared with`},"[Access Order]":{name:`Access Order`,displayName:`Access order`},"[Data Access]":{name:`Data Access`,displayName:`Can read`},"[Agents]":{name:`Agents`,displayName:`Agents`,format:`#,0`},"[Unused Agents]":{name:`Unused Agents`,displayName:`No recorded use`,format:`#,0`}};function L(e=`registry`){return{connection:`vl`,query:e===`resourceGraph`?Ue:He,columnMetadata:Ge,vegaLiteSpec:We,filters:F(e)}}var Ke=[`Organisation content`,`Uploaded files only`,`None declared`,`Not reported`],qe=[`Whole organisation`,`Specific people or groups`,`Not shared`];function Je(e,t=Ke){if(e.rows.length===0)return e;let n=t=>e.columns.findIndex(e=>e.name===t),r={scopeOrder:n(`Scope Order`),scope:n(`Sharing Scope`),accessOrder:n(`Access Order`),access:n(`Data Access`),agents:n(`Agents`),unused:n(`Unused Agents`)};if(Object.values(r).some(e=>e<0))return e;let i=new Map(qe.map((e,t)=>[e,t+1])),a=new Map(t.map((e,t)=>[e,t+1])),o=new Set;for(let t of e.rows)i.set(String(t[r.scope]),t[r.scopeOrder]),a.set(String(t[r.access]),t[r.accessOrder]),o.add(`${t[r.scope]}|${t[r.access]}`);let s=[];for(let[t,n]of i)for(let[i,c]of a){if(o.has(`${t}|${i}`))continue;let a=Array(e.columns.length).fill(null);a[r.scopeOrder]=n,a[r.scope]=t,a[r.accessOrder]=c,a[r.access]=i,a[r.agents]=0,a[r.unused]=0,s.push(a)}return{...e,rows:[...e.rows,...s]}}function Ye(e){if(!e)return;let t=e.columns.findIndex(e=>e.name===`Data Access`),n=e.columns.findIndex(e=>e.name===`Agents`);if(t<0||n<0)return;let r=new Set(e.rows.filter(e=>Number(e[n])>0).map(e=>String(e[t])));return r.size===1?[...r][0]:void 0}function Xe(e,t){let n=structuredClone(e),r=n.layer[0].encoding.color;return r.scale={...r.scale??{},range:[t.quiet,t.strong]},n.layer[1].encoding.color=_e(r.field,t.quietText,t.strongText),n}var Ze=`EVALUATE\r
VAR __Live =\r
    FILTER(\r
        'Agents 365',\r
        NOT (LOWER(TRIM(COALESCE('Agents 365'[Created in], ""))) IN {"", "not available"})\r
            && NOT (LOWER(TRIM(COALESCE('Agents 365'[Is Blocked], ""))) IN {"true", "yes", "1"})\r
    )\r
VAR __Status =\r
    ADDCOLUMNS(\r
        __Live,\r
        "@Status",\r
            SWITCH(\r
                TRUE(),\r
                LOWER(TRIM(COALESCE('Agents 365'[Agent creator source], ""))) = "unattributed", "No owner on record",\r
                'Agents 365'[Owner account] = "Disabled", "Owner disabled",\r
                'Agents 365'[Owner account] = "Not found", "Owner not found",\r
                'Agents 365'[Owner account] = "Active", "Owner active",\r
                "Not checked"\r
            )\r
    )\r
RETURN\r
    SELECTCOLUMNS(\r
        GROUPBY(__Status, [@Status], "@Agents", COUNTX(CURRENTGROUP(), 1)),\r
        "Status Order",\r
            SWITCH(\r
                [@Status],\r
                "Owner active", 1,\r
                "Owner disabled", 2,\r
                "Owner not found", 3,\r
                "No owner on record", 4,\r
                5\r
            ),\r
        "Owner Status", [@Status],\r
        "Agents", [@Agents]\r
    )\r
ORDER BY [Status Order]\r
`,Qe=`EVALUATE\r
VAR __Date = MAX('Agent Configuration'[SnapshotDate])\r
VAR __Live =\r
    FILTER(\r
        'Agent Configuration',\r
        'Agent Configuration'[SnapshotDate] = __Date\r
            && NOT ('Agent Configuration'[IsQuarantined] = TRUE())\r
    )\r
VAR __Status =\r
    ADDCOLUMNS(\r
        __Live,\r
        "@Status",\r
            SWITCH(\r
                TRUE(),\r
                TRIM(COALESCE('Agent Configuration'[OwnerId], "")) = "", "No owner on record",\r
                'Agent Configuration'[Owner account] = "Disabled", "Owner disabled",\r
                'Agent Configuration'[Owner account] = "Not found", "Owner not found",\r
                'Agent Configuration'[Owner account] = "Active", "Owner active",\r
                "Not checked"\r
            )\r
    )\r
RETURN\r
    SELECTCOLUMNS(\r
        GROUPBY(__Status, [@Status], "@Agents", COUNTX(CURRENTGROUP(), 1)),\r
        "Status Order",\r
            SWITCH(\r
                [@Status],\r
                "Owner active", 1,\r
                "Owner disabled", 2,\r
                "Owner not found", 3,\r
                "No owner on record", 4,\r
                5\r
            ),\r
        "Owner Status", [@Status],\r
        "Agents", [@Agents]\r
    )\r
ORDER BY [Status Order]\r
`,$e={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},encoding:{y:{field:`Owner Status`,type:`nominal`,title:null,sort:{field:`Status Order`,op:`min`,order:`ascending`},axis:{labelLimit:200}},x:{field:`Agents`,type:`quantitative`,title:`Agents`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}},color:{field:`Owner Status`,type:`nominal`,legend:null},tooltip:[{field:`Owner Status`,type:`nominal`,title:`Owner`},{field:`Agents`,type:`quantitative`,title:`Agents`,format:`,.0f`}]}},et={"[Status Order]":{name:`Status Order`,displayName:`Status order`},"[Owner Status]":{name:`Owner Status`,displayName:`Owner`},"[Agents]":{name:`Agents`,displayName:`Agents`,format:`#,0`}},tt=[`Owner active`,`Owner disabled`,`Owner not found`,`No owner on record`,`Not checked`];function R(e=`registry`){return{connection:`vl`,query:e===`resourceGraph`?Qe:P(Ze,e),columnMetadata:et,vegaLiteSpec:$e,filters:F(e)}}var nt=`EVALUATE\r
// Capped at the top 1,000 in the queue's order; Total counts every flagged agent.\r
VAR _queue =\r
    SELECTCOLUMNS(\r
        FILTER('Agents 365', NOT ISBLANK('Agents 365'[Governance Flags])),\r
        "Agent", 'Agents 365'[Agent name],\r
        "Registry Id", 'Agents 365'[Title ID],\r
        "Type", 'Agents 365'[Agent Type Label],\r
        "Creator", 'Agents 365'[Creator],\r
        "Sharing Scope", 'Agents 365'[Sharing Scope],\r
        "Data Access", 'Agents 365'[Data Access],\r
        "Users", COALESCE('Agents 365'[Total Users], 0),\r
        "Owner Account", COALESCE('Agents 365'[Owner account], "Not checked"),\r
        "Flag Count",\r
            LEN('Agents 365'[Governance Flags])\r
                - LEN(SUBSTITUTE('Agents 365'[Governance Flags], ";", ""))\r
                + 1,\r
        "Priority",\r
            IF(CONTAINSSTRING('Agents 365'[Governance Flags], "No sign-in required"), 3)\r
                + IF(CONTAINSSTRING('Agents 365'[Governance Flags], "Owner has left"), 3)\r
                + IF(CONTAINSSTRING('Agents 365'[Governance Flags], "Org-wide with org data"), 2)\r
                + IF(CONTAINSSTRING('Agents 365'[Governance Flags], "No owner on record"), 2)\r
                + IF(CONTAINSSTRING('Agents 365'[Governance Flags], "Shared, no recorded use"), 1)\r
                + 0,\r
        "Flags", 'Agents 365'[Governance Flags]\r
    )\r
VAR _total = COUNTROWS(_queue)\r
RETURN\r
    ADDCOLUMNS(\r
        TOPN(\r
            1000,\r
            _queue,\r
            [Priority], DESC,\r
            [Flag Count], DESC,\r
            [Users], DESC,\r
            [Agent], ASC,\r
            [Registry Id], ASC\r
        ),\r
        "Total", _total\r
    )\r
ORDER BY [Priority] DESC, [Flag Count] DESC, [Users] DESC, [Agent] ASC, [Registry Id] ASC\r
`,rt=`EVALUATE\r
// Capped at the top 1,000 in the queue's order; Total counts every flagged agent.\r
VAR __Date = MAX('Agent Configuration'[SnapshotDate])\r
VAR _queue =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            'Agent Configuration',\r
            'Agent Configuration'[SnapshotDate] = __Date\r
                && NOT ISBLANK('Agent Configuration'[Governance Flags])\r
        ),\r
        "Agent", 'Agent Configuration'[AgentName],\r
        "Agent Id", 'Agent Configuration'[AgentResourceId],\r
        "Type", 'Agent Configuration'[Agent Type Label],\r
        "Creator", 'Agent Configuration'[Owner UPN],\r
        "Sharing Scope", 'Agent Configuration'[Sharing Scope],\r
        "Data Access", 'Agent Configuration'[Data Access],\r
        "Users", COALESCE('Agent Configuration'[Total Users], 0),\r
        "Owner Account", COALESCE('Agent Configuration'[Owner account], "Not checked"),\r
        "Flag Count",\r
            LEN('Agent Configuration'[Governance Flags])\r
                - LEN(SUBSTITUTE('Agent Configuration'[Governance Flags], ";", ""))\r
                + 1,\r
        "Priority",\r
            IF(CONTAINSSTRING('Agent Configuration'[Governance Flags], "No sign-in required"), 3)\r
                + IF(CONTAINSSTRING('Agent Configuration'[Governance Flags], "Owner has left"), 3)\r
                + IF(CONTAINSSTRING('Agent Configuration'[Governance Flags], "Org-wide with org data"), 2)\r
                + IF(CONTAINSSTRING('Agent Configuration'[Governance Flags], "No owner on record"), 2)\r
                + IF(CONTAINSSTRING('Agent Configuration'[Governance Flags], "Shared, no recorded use"), 1)\r
                + 0,\r
        "Flags", 'Agent Configuration'[Governance Flags]\r
    )\r
VAR _total = COUNTROWS(_queue)\r
RETURN\r
    ADDCOLUMNS(\r
        TOPN(\r
            1000,\r
            _queue,\r
            [Priority], DESC,\r
            [Flag Count], DESC,\r
            [Users], DESC,\r
            [Agent], ASC,\r
            [Agent Id], ASC\r
        ),\r
        "Total", _total\r
    )\r
ORDER BY [Priority] DESC, [Flag Count] DESC, [Users] DESC, [Agent] ASC, [Agent Id] ASC\r
`,z={"[Agent]":{name:`Agent`,displayName:`Agent`},"[Registry Id]":{name:`Registry Id`,displayName:`Registry ID`},"[Type]":{name:`Type`,displayName:`Agent type`},"[Creator]":{name:`Creator`,displayName:`Creator`},"[Sharing Scope]":{name:`Sharing Scope`,displayName:`Shared with`},"[Data Access]":{name:`Data Access`,displayName:`Can read`},"[Users]":{name:`Users`,displayName:`Users`,format:`#,0`},"[Owner Account]":{name:`Owner Account`,displayName:`Owner account`},"[Flag Count]":{name:`Flag Count`,displayName:`Flags raised`,format:`#,0`},"[Priority]":{name:`Priority`,displayName:`Priority`,format:`#,0`},"[Flags]":{name:`Flags`,displayName:`Why it's here`},...o},it=Object.fromEntries(Object.entries(z).map(([e,t])=>e===`[Registry Id]`?[`[Agent Id]`,{name:`Agent Id`,displayName:`Resource ID`}]:e===`[Creator]`?[e,{...t,displayName:`Owner`}]:[e,t]));function B(e=`registry`){return e===`resourceGraph`?{connection:`vl`,query:rt,columnMetadata:it,filters:F(e)}:{connection:`vl`,query:P(nt,e),columnMetadata:z,filters:F(e)}}var at=`EVALUATE\r
VAR __LastRun = MAX('Defender Status'[RunAt])\r
RETURN\r
    SELECTCOLUMNS(\r
        FILTER('Defender Status', 'Defender Status'[RunAt] = __LastRun),\r
        "Probe", 'Defender Status'[Probe],\r
        "Status", 'Defender Status'[Status],\r
        "Source", 'Defender Status'[Source],\r
        "Rows", 'Defender Status'[Rows] + 0,\r
        "Message", 'Defender Status'[Message],\r
        "Run At", 'Defender Status'[RunAt]\r
    )\r
ORDER BY [Probe] ASC\r
`,ot=`EVALUATE\r
ROW(\r
    "Tools Watched", [AI Tools Watched],\r
    "Unsanctioned Tools", [Unsanctioned AI Tools],\r
    "Tools Found", [Shadow AI Tools Found],\r
    "Tools This Week", [Shadow AI Tools This Week],\r
    "Devices", [Shadow AI Devices],\r
    "Users", [Shadow AI Users],\r
    "Cloud Users", [Shadow AI Users (Cloud Discovery)],\r
    "Status", [Shadow AI Status]\r
)\r
`,st=`EVALUATE\r
VAR __LastDay =\r
    MAXX(FILTER('Shadow AI Daily', 'Shadow AI Daily'[Window] = "30d"), 'Shadow AI Daily'[Day])\r
VAR __Activity =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            'Shadow AI Daily',\r
            'Shadow AI Daily'[Window] = "30d"\r
                && 'Shadow AI Daily'[Day] = __LastDay\r
                && 'Shadow AI Daily'[Devices] > 0\r
        ),\r
        "Tool", 'Shadow AI Daily'[Tool],\r
        "Layer", 'Shadow AI Daily'[Layer],\r
        "Posture",\r
            COALESCE(\r
                LOOKUPVALUE('Defender AI Watchlist'[Posture], 'Defender AI Watchlist'[Tool], 'Shadow AI Daily'[Tool]),\r
                "Not reviewed"\r
            ),\r
        "Devices", 'Shadow AI Daily'[Devices] + 0,\r
        "Users", 'Shadow AI Daily'[Users] + 0\r
    )\r
VAR __LastInstall = MAX('Defender AI Installed'[SnapshotDate])\r
VAR __Installed =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            'Defender AI Installed',\r
            'Defender AI Installed'[SnapshotDate] = __LastInstall\r
                && 'Defender AI Installed'[Devices] > 0\r
        ),\r
        "Tool", 'Defender AI Installed'[Tool],\r
        "Layer", "Installed",\r
        "Posture",\r
            COALESCE(\r
                LOOKUPVALUE('Defender AI Watchlist'[Posture], 'Defender AI Watchlist'[Tool], 'Defender AI Installed'[Tool]),\r
                "Not reviewed"\r
            ),\r
        "Devices", 'Defender AI Installed'[Devices] + 0,\r
        "Users", BLANK()\r
    )\r
VAR __LastCloud = MAX('Defender Cloud Discovery'[SnapshotDate])\r
VAR __Cloud =\r
    SELECTCOLUMNS(\r
        FILTER('Defender Cloud Discovery', 'Defender Cloud Discovery'[SnapshotDate] = __LastCloud),\r
        "Tool",\r
            IF(\r
                COALESCE('Defender Cloud Discovery'[WatchlistTool], "") <> "",\r
                'Defender Cloud Discovery'[WatchlistTool],\r
                'Defender Cloud Discovery'[AppName]\r
            ),\r
        "Layer", "Cloud Discovery",\r
        "Posture",\r
            SWITCH(\r
                'Defender Cloud Discovery'[Posture],\r
                "Sanctioned", "Sanctioned",\r
                "Unsanctioned", "Unsanctioned",\r
                "Not reviewed"\r
            ),\r
        "Devices", 'Defender Cloud Discovery'[Devices] + 0,\r
        "Users", 'Defender Cloud Discovery'[Users] + 0\r
    )\r
RETURN\r
    FILTER(\r
        GROUPBY(\r
            UNION(__Activity, __Installed, __Cloud),\r
            [Tool],\r
            [Layer],\r
            [Posture],\r
            "Devices", MAXX(CURRENTGROUP(), [Devices]),\r
            "Users", MAXX(CURRENTGROUP(), [Users])\r
        ),\r
        [Posture] <> "Sanctioned"\r
    )\r
ORDER BY [Layer] ASC, [Devices] DESC, [Users] DESC, [Tool] ASC\r
`,ct={$schema:`https://vega.github.io/schema/vega-lite/v5.json`,width:`container`,height:`container`,mark:{type:`bar`},encoding:{y:{field:`Tool`,type:`nominal`,title:null,sort:`-x`,axis:{labelLimit:200}},x:{field:`Devices`,type:`quantitative`,title:`Devices`,axis:{labelExpr:`compactFormat(datum.value, '#,0')`}},color:{field:`Posture`,type:`nominal`,legend:{orient:`bottom`,title:null}},tooltip:[{field:`Tool`,type:`nominal`,title:`Tool`},{field:`Posture`,type:`nominal`,title:`Posture`},{field:`Devices`,type:`quantitative`,title:`Devices`,format:`,.0f`},{field:`Users`,type:`quantitative`,title:`People`,format:`,.0f`}]}},lt={"[Tools Watched]":{name:`Tools Watched`,displayName:`AI tools watched`,format:`#,0`},"[Unsanctioned Tools]":{name:`Unsanctioned Tools`,displayName:`Marked unsanctioned`,format:`#,0`},"[Tools Found]":{name:`Tools Found`,displayName:`Shadow AI tools found`,format:`#,0`},"[Tools This Week]":{name:`Tools This Week`,displayName:`Found this week`,format:`#,0`},"[Devices]":{name:`Devices`,displayName:`Devices`,format:`#,0`},"[Users]":{name:`Users`,displayName:`People`,format:`#,0`},"[Cloud Users]":{name:`Cloud Users`,displayName:`People (Cloud Discovery)`,format:`#,0`},"[Status]":{name:`Status`,displayName:`Status`}},ut={"[Tool]":{name:`Tool`,displayName:`Tool`},"[Layer]":{name:`Layer`,displayName:`Seen by`},"[Posture]":{name:`Posture`,displayName:`Posture`},"[Devices]":{name:`Devices`,displayName:`Devices`,format:`#,0`},"[Users]":{name:`Users`,displayName:`People`,format:`#,0`}},dt={"[Probe]":{name:`Probe`,displayName:`Probe`},"[Status]":{name:`Status`,displayName:`Status`},"[Source]":{name:`Source`,displayName:`Source`},"[Rows]":{name:`Rows`,displayName:`Rows`,format:`#,0`},"[Message]":{name:`Message`,displayName:`Message`},"[Run At]":{name:`Run At`,displayName:`Last run`}};function ft(){return{connection:`vl`,query:ot,columnMetadata:lt,filters:b}}function pt(){return{connection:`vl`,query:st,columnMetadata:ut,vegaLiteSpec:ct,filters:b}}function mt(){return{connection:`vl`,query:at,columnMetadata:dt,filters:b}}var ht=[`Unsanctioned`,`Not reviewed`],V=[{id:`Ran`,label:`Ran`,probe:`device_activity`,measure:`Devices`,subtitle:`Devices that ran each tool's app or process in the last 30 days`},{id:`Network`,label:`Reached`,probe:`device_activity`,measure:`Devices`,subtitle:`Devices that connected to each tool's web domains in the last 30 days`},{id:`Installed`,label:`Installed`,probe:`installed`,measure:`Devices`,subtitle:`Devices with each tool installed, from Defender Vulnerability Management`},{id:`Cloud Discovery`,label:`Cloud Discovery`,probe:`cloud_discovery`,measure:`Users`,subtitle:`People using each generative AI app in Defender for Cloud Apps over the last 30 days`}],gt={device_activity:`Device activity`,installed:`Installed software`,agents:`AI agents`,cloud_discovery:`Cloud Discovery`};function _t(e){switch(e){case`ok`:return`Loaded`;case`empty`:return`Ran, nothing found`;case`forbidden`:return`No permission`;case`unlicensed`:return`Not licensed`;default:return`Failed`}}var H=new Set([`ok`,`empty`]);function vt(e){let t=yt(e);if(!t)return;if(t.length===0)return{kind:`notRun`};let n=t.filter(e=>!H.has(e.status));return n.length===t.length?{kind:`noAccess`,failing:n}:n.length>0?{kind:`partial`,failing:n}:{kind:`ok`}}function yt(e){if(!e)return;let t=t=>e.columns.findIndex(e=>e.name===t),n={probe:t(`Probe`),status:t(`Status`),message:t(`Message`)};return n.probe<0||n.status<0?[]:e.rows.map(e=>({probe:String(e[n.probe]??``),status:String(e[n.status]??``).toLowerCase(),message:n.message<0?``:String(e[n.message]??``)}))}function bt(e,t){let n=V.find(e=>e.id===t)?.probe,r=e?.find(e=>e.probe===n);return r!==void 0&&!H.has(r.status)}var xt={device_activity:`Microsoft Defender for Endpoint Plan 2`,installed:`Microsoft Defender Vulnerability Management`,cloud_discovery:`Microsoft Defender for Cloud Apps`};function St(e){let t=xt[e];return t?`Needs ${t}`:void 0}function Ct(e,t){let n=V.find(e=>e.id===t)?.probe,r=e?.find(e=>e.probe===n),i=r?.status===`unlicensed`&&n?St(n):void 0;return i?{title:i,description:`Defender answered that this tenant doesn't have ${xt[n]}, so this view stays empty. The other views still load.`}:r&&!H.has(r.status)?{title:`This part of Defender didn't load`,description:`The probe behind this view was refused or failed on the last run. The note above says why.`}:r?.status===`empty`?{title:`No data returned`,description:r.message?`Defender ran this probe and returned no rows: ${r.message}`:`Defender ran this probe and returned no rows for the last 30 days.`}:{title:`No shadow AI seen here`,description:`Defender saw none of the watched tools this way in the last 30 days.`}}function wt(e,t){if(!e)return;let n=e.columns.findIndex(e=>e.name===`Layer`);if(n<0)return e;let r=e.columns.findIndex(e=>e.name===`Posture`),i=new Set(ht),a=e.rows.filter(e=>e[n]===t);return r<0?{...e,rows:a}:{...e,rows:a.map(e=>{if(i.has(e[r]))return e;let t=[...e];return t[r]=`Not reviewed`,t})}}function Tt(e,t){let n=V.find(e=>e.id===t)?.measure??`Devices`,r=structuredClone(e);return r.encoding.x.field=n,r.encoding.x.title=n===`Users`?`People`:`Devices`,r}var Et=`EVALUATE\r
VAR __ConfigDate = MAX('Agent Configuration'[SnapshotDate])\r
VAR __Config = FILTER('Agent Configuration', 'Agent Configuration'[SnapshotDate] = __ConfigDate)\r
VAR __NoSignIn =\r
    DISTINCT(\r
        SELECTCOLUMNS(\r
            FILTER(\r
                __Config,\r
                'Agent Configuration'[NoSignIn] = TRUE()\r
                    && NOT ('Agent Configuration'[IsQuarantined] = TRUE())\r
                    && 'Agent Configuration'[TitleId] <> ""\r
            ),\r
            "Title ID", 'Agent Configuration'[TitleId]\r
        )\r
    )\r
VAR __WebSearch =\r
    DISTINCT(\r
        SELECTCOLUMNS(\r
            FILTER(__Config, 'Agent Configuration'[WebSearchEnabled] = TRUE() && 'Agent Configuration'[TitleId] <> ""),\r
            "Title ID", 'Agent Configuration'[TitleId]\r
        )\r
    )\r
VAR __Tenant =\r
    FILTER(\r
        'Agents 365',\r
        NOT (LOWER(TRIM(COALESCE('Agents 365'[Created in], ""))) IN {"", "not available"})\r
    )\r
VAR __Live =\r
    FILTER(\r
        __Tenant,\r
        NOT (LOWER(TRIM(COALESCE('Agents 365'[Is Blocked], ""))) IN {"true", "yes", "1"})\r
    )\r
VAR __Open = SELECTCOLUMNS(FILTER(__Live, 'Agents 365'[Title ID] IN __NoSignIn), "Title ID", 'Agents 365'[Title ID])\r
VAR __FoundryDate = MAX('Foundry Resources'[SnapshotDate])\r
VAR __Foundry = FILTER('Foundry Resources', 'Foundry Resources'[SnapshotDate] = __FoundryDate)\r
VAR __AgentProbe = FILTER('Resource Graph Status', 'Resource Graph Status'[Probe] = "arg_agent_config")\r
VAR __AgentProbeDate = MAXX(__AgentProbe, 'Resource Graph Status'[SnapshotDate])\r
VAR __FoundryProbe = FILTER('Resource Graph Status', 'Resource Graph Status'[Probe] = "arg_foundry_resources")\r
VAR __FoundryProbeDate = MAXX(__FoundryProbe, 'Resource Graph Status'[SnapshotDate])\r
RETURN\r
    ROW(\r
        "Configured Agents", COUNTROWS(__Config) + 0,\r
        "Matched Agents", COUNTROWS(FILTER(__Config, 'Agent Configuration'[TitleId] <> "")) + 0,\r
        "No Sign In", COUNTROWS(__Open) + 0,\r
        "No Sign In Configured",\r
            COUNTROWS(\r
                FILTER(\r
                    __Config,\r
                    'Agent Configuration'[NoSignIn] = TRUE() && NOT ('Agent Configuration'[IsQuarantined] = TRUE())\r
                )\r
            ) + 0,\r
        "Web Search", COUNTROWS(FILTER(__Live, 'Agents 365'[Title ID] IN __WebSearch)) + 0,\r
        "Web Search Configured",\r
            COUNTROWS(\r
                FILTER(\r
                    __Config,\r
                    'Agent Configuration'[WebSearchEnabled] = TRUE() && NOT ('Agent Configuration'[IsQuarantined] = TRUE())\r
                )\r
            ) + 0,\r
        "Foundry Resources", COUNTROWS(__Foundry) + 0,\r
        "Foundry Public", COUNTROWS(FILTER(__Foundry, 'Foundry Resources'[PublicNetwork] = TRUE())) + 0,\r
        "Foundry Public Projects",\r
            COUNTROWS(\r
                FILTER(__Foundry, 'Foundry Resources'[PublicNetwork] = TRUE() && 'Foundry Resources'[IsProject] = TRUE())\r
            ) + 0,\r
        "Agent Status",\r
            MAXX(FILTER(__AgentProbe, 'Resource Graph Status'[SnapshotDate] = __AgentProbeDate), 'Resource Graph Status'[Status]),\r
        "Foundry Status",\r
            MAXX(FILTER(__FoundryProbe, 'Resource Graph Status'[SnapshotDate] = __FoundryProbeDate), 'Resource Graph Status'[Status])\r
    )\r
`,U=(e,t)=>({name:e,displayName:t,format:`#,0`}),Dt={"[Configured Agents]":U(`Configured Agents`,`Agents configured`),"[Matched Agents]":U(`Matched Agents`,`Matched to the registry`),"[No Sign In]":U(`No Sign In`,`No sign-in required`),"[No Sign In Configured]":U(`No Sign In Configured`,`No sign-in required, any agent`),"[Web Search]":U(`Web Search`,`Web search on`),"[Web Search Configured]":U(`Web Search Configured`,`Web search on, any agent`),"[Foundry Resources]":U(`Foundry Resources`,`Foundry resources`),"[Foundry Public]":U(`Foundry Public`,`Open to the public network`),"[Foundry Public Projects]":U(`Foundry Public Projects`,`Projects open to the public network`),"[Agent Status]":{name:`Agent Status`,displayName:`Agent inventory status`},"[Foundry Status]":{name:`Foundry Status`,displayName:`Foundry status`}};function Ot(){return{connection:`vl`,query:Et,columnMetadata:Dt,filters:ie}}var kt={title:`Azure Resource Graph isn't turned on`,description:`Turn on Azure Resource Graph in the installer to see agent configuration, such as agents anyone can use without signing in or that search the web, and Foundry resources open to the public network. The figures fill in after the next load and model refresh.`},At={title:`No Resource Graph data yet`,description:`Azure Resource Graph is turned on, but no agent configuration or Foundry resources have loaded yet. Run the load, refresh the model, then reopen the app.`},jt={title:`Not collected: permission missing`,description:`Azure Resource Graph is turned on, but the identity that runs the load isn't allowed to read it, so nothing was collected. The figures aren't zero: they're unknown until it has the role named below.`},Mt=`Not collected: permission missing`,Nt=`The identity that runs the load can't read the Copilot Studio agent inventory. Give it an Entra role such as Global Reader or Power Platform Administrator, or set up the "Analytics Hub - Agent inventory" flow as a fallback, then run the load again. The installer assigns Global Reader itself when whoever runs it is a Global Administrator or Privileged Role Administrator.`,Pt=`The identity that runs the load can't list Foundry resources. Give it Reader at the management group that holds your Azure subscriptions, then run the load again.`,Ft=`The last load couldn't read the Copilot Studio agent inventory. Check the load's log, then run it again.`,It=`The last load couldn't list Foundry resources. Check the load's log, then run it again.`;function W(e,n){return t(e,n)?.toLowerCase()}function Lt(e){let t=[],n=W(e,`[Agent Status]`),r=W(e,`[Foundry Status]`);return n===`forbidden`?t.push(Nt):n===`error`&&t.push(Ft),r===`forbidden`?t.push(Pt):r===`error`&&t.push(It),t}function Rt(e,t){if(t===`notConfigured`)return{kind:`notSetUp`};if(e.error!==void 0)return s(e.error)?{kind:`notSetUp`}:{kind:`error`,message:e.error};if(!e.loaded)return{kind:`loading`};let n=Lt(e.row),r=(a(e.row,`[Configured Agents]`)??0)>0,i=(a(e.row,`[Foundry Resources]`)??0)>0,o={agents:!r&&W(e.row,`[Agent Status]`)===`forbidden`,foundry:!i&&W(e.row,`[Foundry Status]`)===`forbidden`};return!r&&!i?{kind:`noData`,notes:n,forbidden:o}:{kind:`ready`,agents:r,foundry:i,notes:n,forbidden:o}}var zt=`EVALUATE\r
VAR __ConfigDate = MAX('Agent Configuration'[SnapshotDate])\r
VAR __WebSearch =\r
    DISTINCT(\r
        SELECTCOLUMNS(\r
            FILTER(\r
                'Agent Configuration',\r
                'Agent Configuration'[SnapshotDate] = __ConfigDate\r
                    && 'Agent Configuration'[WebSearchEnabled] = TRUE()\r
                    && 'Agent Configuration'[TitleId] <> ""\r
            ),\r
            "Title ID", 'Agent Configuration'[TitleId]\r
        )\r
    )\r
VAR __Live =\r
    FILTER(\r
        'Agents 365',\r
        NOT (LOWER(TRIM(COALESCE('Agents 365'[Created in], ""))) IN {"", "not available"})\r
            && NOT (LOWER(TRIM(COALESCE('Agents 365'[Is Blocked], ""))) IN {"true", "yes", "1"})\r
            && 'Agents 365'[Title ID] IN __WebSearch\r
    )\r
RETURN\r
    SELECTCOLUMNS(\r
        GROUPBY(\r
            __Live,\r
            'Agents 365'[Sharing Scope],\r
            "@Agents", COUNTX(CURRENTGROUP(), 1),\r
            "@Unused", SUMX(CURRENTGROUP(), IF(COALESCE('Agents 365'[Total Users], 0) = 0, 1, 0))\r
        ),\r
        "Scope Order",\r
            SWITCH(\r
                'Agents 365'[Sharing Scope],\r
                "Whole organisation", 1,\r
                "Specific people or groups", 2,\r
                "Not shared", 3,\r
                4\r
            ),\r
        "Sharing Scope", COALESCE('Agents 365'[Sharing Scope], "Not stated"),\r
        "Access Order", 5,\r
        "Data Access", "Public web",\r
        "Agents", [@Agents],\r
        "Unused Agents", [@Unused]\r
    )\r
ORDER BY [Scope Order]\r
`,Bt=`EVALUATE\r
VAR __Date = MAX('Agent Configuration'[SnapshotDate])\r
VAR __Live =\r
    FILTER(\r
        'Agent Configuration',\r
        'Agent Configuration'[SnapshotDate] = __Date\r
            && NOT ('Agent Configuration'[IsQuarantined] = TRUE())\r
            && 'Agent Configuration'[WebSearchEnabled] = TRUE()\r
    )\r
RETURN\r
    SELECTCOLUMNS(\r
        GROUPBY(\r
            __Live,\r
            'Agent Configuration'[Sharing Scope],\r
            "@Agents", COUNTX(CURRENTGROUP(), 1),\r
            "@Unused", SUMX(CURRENTGROUP(), IF(COALESCE('Agent Configuration'[Total Users], 0) = 0, 1, 0))\r
        ),\r
        "Scope Order",\r
            SWITCH(\r
                'Agent Configuration'[Sharing Scope],\r
                "Whole organisation", 1,\r
                "Specific people or groups", 2,\r
                "Not shared", 3,\r
                4\r
            ),\r
        "Sharing Scope", COALESCE('Agent Configuration'[Sharing Scope], "Not stated"),\r
        "Access Order", 5,\r
        "Data Access", "Public web",\r
        "Agents", [@Agents],\r
        "Unused Agents", [@Unused]\r
    )\r
ORDER BY [Scope Order]\r
`,Vt=`Public web`,Ht=[...Ke,Vt];function G(e=`registry`){return{connection:`vl`,query:e===`resourceGraph`?Bt:zt,columnMetadata:L(e).columnMetadata,filters:F(e)}}function Ut(e,t){if(!t||t.rows.length===0)return e;let n=e.columns.map(e=>t.columns.findIndex(t=>t.name===e.name));return n.some(e=>e<0)?e:{...e,rows:[...e.rows,...t.rows.map(e=>n.map(t=>e[t]))]}}var K=ee();function q(){return(0,K.jsxs)(`p`,{className:`flex max-w-[80ch] items-start gap-200 ${de} text-muted-foreground`,children:[(0,K.jsx)(ce,{className:`icon-size-200 mt-[2px] shrink-0`,"aria-hidden":`true`}),Ie]})}var Wt={registry:R(`registry`),registryOwnerFallback:R(`registryOwnerFallback`),resourceGraph:R(`resourceGraph`)};function Gt(e,t){return e===`resourceGraph`?[{term:`Owner account`,text:`Each run, the Azure Resource Graph load looks up every agent's owner in Entra ID and records whether the account is active, disabled or gone. It needs the User.Read.All permission.`},{term:`Not checked`,text:t?`No owner has been checked yet: the load ran with CHECK_OWNER_ACCOUNT = False, or without User.Read.All. Rerun it with the check on to fill this in.`:`Agents whose owner wasn't looked up, such as those added since the last load.`}]:[{term:`Owner account`,text:`Each run, the registry ingester looks up every creator in Entra ID and records whether the account is active, disabled or gone. It needs the User.Read.All permission.${e===`registryOwnerFallback`?` Where the registry didn't check an owner, the Azure Resource Graph load's check fills in.`:``}`},{term:`Not checked`,text:t?`No owner has been checked yet: the registry was loaded from an export, or the ingester ran with CHECK_OWNER_ACCOUNT = False. Rerun the registry ingester with it on to fill this in.`:`Agents whose creator wasn't looked up, such as those added since the last ingester run.`}]}function Kt({summary:e,mode:t=`registry`}){let{theme:n}=g(),r=ue(),i=(0,j.useMemo)(()=>he(r,n),[r,n]),o=O(Wt[t]),s=t===`resourceGraph`,c=(0,j.useMemo)(()=>ge(Wt.registry.vegaLiteSpec,tt,[i.positive,i.negative,i.negative,i.caution,i.neutral]),[i]),l=e.loaded&&(a(e.row,`[Owners Checked]`)??0)===0;return(0,K.jsxs)(D,{id:f(`accountability`),title:`Accountability`,description:`Whether the person who built each agent is still here to answer for it.`,children:[s&&(0,K.jsx)(q,{}),(0,K.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,K.jsx)(h,{result:o,spec:c,height:me(o.table?.rows.length??tt.length),title:`Owner status`,subtitle:s?`Copilot Studio agents, by whether their owner's account is still active`:`Tenant-built agents, by whether their creator's account is still active`,emptyTitle:s?`No Copilot Studio agents`:`No tenant-built agents`,emptyDescription:s?`Azure Resource Graph holds no Copilot Studio agents for these filters.`:`The registry holds no agents built in this tenant for these filters.`}),(0,K.jsx)(`div`,{className:`self-start`,children:(0,K.jsx)(m,{title:`How owners are checked`,notes:Gt(t,l)})})]})]})}function qt({notes:e}){return e.map(e=>(0,K.jsxs)(`p`,{className:`flex max-w-[80ch] items-start gap-200 ${de} text-muted-foreground`,children:[(0,K.jsx)(De,{className:`icon-size-200 mt-[2px] shrink-0`,"aria-hidden":`true`}),e]},e))}function Jt({summary:e,className:t,mode:n=`registry`}){let{result:r,view:i}=e,o=r.row,s=n===`resourceGraph`;switch(i.kind){case`loading`:return(0,K.jsx)(y,{});case`notSetUp`:return(0,K.jsx)(x,{...kt});case`error`:return(0,K.jsx)(ae,{message:i.message,onRetry:r.refetch});case`noData`:return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(x,{...i.forbidden.agents||i.forbidden.foundry?jt:At}),(0,K.jsx)(qt,{notes:i.notes})]});case`ready`:{let e=e=>i.agents?a(o,e):void 0,n=e=>i.foundry?a(o,e):void 0,c=i.forbidden.agents?Mt:`Not read`,l=i.forbidden.foundry?Mt:`Not read`;return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(ye,{from:[r.notFilteredBy]}),(0,K.jsxs)(`div`,{className:t,children:[(0,K.jsx)(w,{label:`No sign-in required`,value:e(s?`[No Sign In Configured]`:`[No Sign In]`),emptyValue:c,emphasis:!0,detail:s?void 0:(0,K.jsx)(T,{label:`Any agent, live or not`,value:e(`[No Sign In Configured]`)})}),(0,K.jsx)(w,{label:`Web search on`,value:e(s?`[Web Search Configured]`:`[Web Search]`),emptyValue:c,detail:(0,K.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,K.jsx)(T,{label:`Agents configured`,value:e(`[Configured Agents]`)}),!s&&(0,K.jsx)(T,{label:`Matched to the registry`,value:e(`[Matched Agents]`)})]})}),(0,K.jsx)(w,{label:`Foundry open to the public network`,value:n(`[Foundry Public]`),emptyValue:l,detail:(0,K.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,K.jsx)(T,{label:`Foundry resources`,value:n(`[Foundry Resources]`)}),(0,K.jsx)(T,{label:`Projects among them`,value:n(`[Foundry Public Projects]`)})]})})]}),(0,K.jsx)(qt,{notes:i.notes})]})}}}var Yt=Ot(),Xt={...Yt,query:``};function Zt(){let e=C(),t=k(e.resourceGraph===`notConfigured`?Xt:Yt);return{result:t,view:Rt(t,e.resourceGraph)}}var Qt=we(),J=Pe(),$t=`grid gap-300 md:grid-cols-2 xl:grid-cols-4`;function en(e){switch(e.kind){case`none`:return`None of the ${E(e.unmatchedSessions,`whole`)} agent sessions in the audit log match an agent in the registry, so no registered agent shows any use and every shared agent reads as unused. Leaderboards lists the agents people did use by their audit-log names.`;case`partial`:return`${E(e.unmatchedSessions,`whole`)} agent sessions match no agent in the registry, so some agents here may be in use under another name. ${E(e.seenInUse,`whole`)} of ${E(e.registryAgents,`whole`)} registered agents are seen in use.`;default:return}}var Y=[{term:`No sign-in required`,text:`The agent answers anyone who reaches it without asking them to sign in, so nothing ties a conversation to a person. Needs Azure Resource Graph or the optional Defender source; Resource Graph wins where both know the agent.`},{term:`Owner has left`,text:`The creator's Entra account is disabled or no longer exists, so nobody is accountable for the agent.`},{term:`Org-wide with org data`,text:`Anyone in the organisation can use the agent, and it can read SharePoint sites, OneDrive files or Graph connectors.`},{term:`No owner on record`,text:`The registry names no creator for a tenant-built agent.`},{term:`Shared, no recorded use`,text:`The agent is shared with others, but the audit log records nobody using it. A candidate to retire.`}],tn=[{term:`No sign-in required`,text:`The agent answers anyone who reaches it without asking them to sign in, so nothing ties a conversation to a person.`},{term:`Owner has left`,text:`The owner's Entra account is disabled or no longer exists, so nobody is accountable for the agent.`},Y[2],{term:`No owner on record`,text:`Azure Resource Graph names no owner for the agent.`},Y[4]];function nn({summary:e,mode:t=`registry`}){return t===`resourceGraph`?(0,K.jsx)(an,{summary:e}):(0,K.jsx)(rn,{summary:e})}function rn({summary:e}){let t=k(Qt),n=O(J),r=Zt(),i=e.row,o=en(Te(t.row)),s={row:e.row&&t.row?e.row:void 0,loaded:e.loaded&&t.loaded,error:e.error??t.error,refetch:()=>{e.refetch(),t.refetch()}},c=t.loaded&&(a(t.row,`[Registry Agents]`)??0)===0;return(0,K.jsxs)(D,{id:f(`estate-health`),title:`Estate health`,description:`How many agents are registered, how many of those built here need a review, and where each one sits in its lifecycle.`,children:[(0,K.jsxs)(p,{summary:c?{...s,row:void 0}:s,count:4,className:$t,emptyTitle:`No agents in the registry`,emptyDescription:`Run the Agent 365 registry ingester, or load a registry export, and refresh the model. Governance reads the registry, not the audit log.`,children:[(0,K.jsx)(w,{label:`Registered agents`,value:a(t.row,`[Registry Agents]`),detail:(0,K.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,K.jsx)(T,{label:`Built in this tenant`,value:a(t.row,`[Tenant Built]`)}),(0,K.jsx)(T,{label:`Seen in use`,value:a(t.row,`[Seen In Use]`)})]})}),(0,K.jsx)(w,{label:`Need a review`,value:a(i,`[Needs Review]`),emphasis:!0,detail:(0,K.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,K.jsx)(T,{label:`Of those built here`,value:a(i,`[Tenant Agents]`)}),(0,K.jsx)(T,{label:`No sign-in required`,value:a(i,`[No Sign In]`)})]})}),(0,K.jsx)(w,{label:`Shared org-wide`,value:a(i,`[Org Wide]`),detail:(0,K.jsx)(T,{label:`Reading org content`,value:a(i,`[Org Wide Org Data]`)})}),(0,K.jsx)(w,{label:`Owner has left`,value:a(i,`[Owner Left]`),detail:(0,K.jsx)(T,{label:`No owner on record`,value:a(i,`[No Owner]`)})})]}),(0,K.jsx)(Jt,{summary:r,className:`grid gap-300 md:grid-cols-3`}),o&&(0,K.jsxs)(`p`,{className:`flex max-w-[80ch] items-start gap-200 text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:[(0,K.jsx)(ke,{className:`icon-size-200 mt-[2px] shrink-0`,"aria-hidden":`true`}),o]}),(0,K.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,K.jsx)(h,{result:n,spec:J.vegaLiteSpec,capabilities:J.capabilities,height:420,title:`Registry by lifecycle`,subtitle:`Registered agents at each stage, by who built them`,emptyTitle:`The registry is empty`,emptyDescription:`No agents were loaded from the Agent 365 registry. Check that the registry ingestion has run.`}),(0,K.jsx)(`div`,{className:`self-start`,children:(0,K.jsx)(m,{title:`Why an agent needs a review`,notes:Y})})]})]})}function an({summary:e}){let t=Zt(),n=e.row,r=e.loaded&&(a(n,`[Tenant Agents]`)??0)===0;return(0,K.jsxs)(D,{id:f(`estate-health`),title:`Estate health`,description:`How many Copilot Studio agents there are, and how many of them need a review.`,children:[(0,K.jsx)(q,{}),(0,K.jsxs)(p,{summary:r?{...e,row:void 0}:e,count:4,className:$t,emptyTitle:`No Copilot Studio agents yet`,emptyDescription:`Azure Resource Graph hasn't loaded any Copilot Studio agents. Run the load, refresh the model, then reopen the app.`,children:[(0,K.jsx)(w,{label:`Copilot Studio agents`,value:a(n,`[Tenant Agents]`),detail:(0,K.jsx)(T,{label:`Seen in use`,value:a(n,`[Seen In Use]`)})}),(0,K.jsx)(w,{label:`Need a review`,value:a(n,`[Needs Review]`),emphasis:!0,detail:(0,K.jsx)(T,{label:`No sign-in required`,value:a(n,`[No Sign In]`)})}),(0,K.jsx)(w,{label:`Shared org-wide`,value:a(n,`[Org Wide]`),detail:(0,K.jsx)(T,{label:`Reading org content`,value:a(n,`[Org Wide Org Data]`)})}),(0,K.jsx)(w,{label:`Owner has left`,value:a(n,`[Owner Left]`),detail:(0,K.jsx)(T,{label:`No owner on record`,value:a(n,`[No Owner]`)})})]}),(0,K.jsx)(Jt,{summary:t,mode:`resourceGraph`,className:`grid gap-300 md:grid-cols-3`}),(0,K.jsx)(`div`,{className:`max-w-[80ch]`,children:(0,K.jsx)(m,{title:`Why an agent needs a review`,notes:tn})})]})}var X={registry:{exposure:L(`registry`),publicWeb:G(`registry`)},registryOwnerFallback:{exposure:L(`registryOwnerFallback`),publicWeb:G(`registryOwnerFallback`)},resourceGraph:{exposure:L(`resourceGraph`),publicWeb:G(`resourceGraph`)}},on={...X.registry.publicWeb,query:``};function sn(e,t){return e===`Not reported`?t?`Azure Resource Graph gave no knowledge sources for these agents, so what they can read is unknown`:`The registry gave no capability details for these agents, so what they can read is unknown`:e===`None declared`?`None of these agents declares any data it can read`:`Every one of these agents can read ${e.toLowerCase()}`}var cn=[{term:`The corner to watch`,text:`Top left: agents anyone in the organisation can use that also read organisation content. Each is worth a check that it only surfaces what its audience should see.`},{term:`Shared with`,text:`Who the registry says can use the agent. Not stated means the registry or its export didn't say.`},{term:`What it can read`,text:`Organisation content means SharePoint sites, OneDrive files or Graph connectors. Not reported means the registry gave no capability details for the agent.`}],ln=[cn[0],{term:`Shared with`,text:`Who Azure Resource Graph says the agent is shared with: the whole organisation, specific people or groups, or nobody else.`},{term:`What it can read`,text:`Organisation content means SharePoint sites, OneDrive files or Graph connectors. Not reported means Azure Resource Graph listed no knowledge sources for the agent.`}],un={term:Vt,text:`Agents with web search turned on as a knowledge source, from Azure Resource Graph. They also appear under whatever else they can read.`};function dn({mode:e=`registry`}){let{theme:t}=g(),n=e===`resourceGraph`,r=X[e],i=O(r.exposure),a=C().resourceGraph===`present`||n,o=O(a?r.publicWeb:on).table,s=(0,j.useMemo)(()=>{if(i.table)return!a||!o?Je(i.table):Je(Ut(i.table,o),Ht)},[i.table,o,a]),c=Ye(i.table),l=(0,j.useMemo)(()=>Xe(X.registry.exposure.vegaLiteSpec,{quiet:t.backgroundHover||t.backgroundSecondary,strong:t.brandBackground,quietText:t.foreground,strongText:t.background}),[t]);return(0,K.jsxs)(D,{id:f(`exposure`),title:`Exposure`,description:`Who can reach the agents built here, against what they can read.`,children:[n&&(0,K.jsx)(q,{}),(0,K.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,K.jsx)(h,{result:{...i,table:s},spec:l,height:340,title:`Sharing against data access`,subtitle:c?sn(c,n):`${n?`Copilot Studio`:`Tenant-built`} agents in each pairing; hover for how many have no recorded use`,emptyTitle:n?`No Copilot Studio agents`:`No tenant-built agents`,emptyDescription:n?`Azure Resource Graph holds no Copilot Studio agents for these filters.`:`The registry holds no agents built in this tenant for these filters.`}),(0,K.jsx)(`div`,{className:`self-start`,children:(0,K.jsx)(m,{title:`Reading the map`,notes:[...n?ln:cn,...a?[un]:[]]})})]})]})}var fn={registry:B(`registry`),registryOwnerFallback:B(`registryOwnerFallback`),resourceGraph:B(`resourceGraph`)},pn=ve(`whole`);function mn({mode:e=`registry`}){let{theme:t}=g(),n=e===`resourceGraph`,r=O(fn[e]),i=r.table?.rows.length??0,a=xe(r.table),o=(0,j.useMemo)(()=>[{id:`Agent`,header:`Agent`,width:240,cellRenderer:A},{id:`Flags`,header:`Why it's here`,width:300,cellRenderer:A},{id:`Type`,header:`Type`,width:140,cellRenderer:A},{id:`Creator`,header:n?`Owner`:`Creator`,width:200,cellRenderer:A},{id:`Owner Account`,header:`Owner account`,width:128,cellRenderer:A},{id:`Sharing Scope`,header:`Shared with`,width:180,cellRenderer:A},{id:`Data Access`,header:`Can read`,width:160,cellRenderer:A},{id:`Users`,header:`Users`,width:88,numericStyling:!0,cellRenderer:Se({domain:Ce(r.table,`Users`),format:pn})}],[r.table,n]);return(0,K.jsxs)(D,{id:f(`review-queue`),title:`Review queue`,description:`Every agent built here that needs a look, the most serious flags first, then the most used.`,children:[n&&(0,K.jsx)(q,{}),(0,K.jsx)(te,{result:r,height:pe(i),emptyTitle:`Nothing needs a review`,emptyDescription:n?`No Copilot Studio agent carries a governance flag for these filters.`:`No agent built in this tenant carries a governance flag for these filters.`,children:e=>(0,K.jsx)(_,{columns:o,data:e,theme:t,header:{title:`Agents to review`,subtitle:a===void 0?`Full flagged count unavailable`:`${a.toLocaleString()} flagged`}})}),!r.isLoading&&r.error===void 0&&(0,K.jsx)(be,{shown:i,total:a,noun:`flagged agents`})]})}var hn=ft(),gn=pt(),_n=mt(),vn=`grid gap-300 md:grid-cols-2 xl:grid-cols-4`,Z=`Shadow AI`,Q=`AI tools people use that you haven't sanctioned, as Microsoft Defender sees them on your devices and network.`,yn=[{term:`A floor, not a census`,text:`Defender only sees devices onboarded to Defender for Endpoint, and only the tools on the watchlist. Personal devices, unmanaged browsers and tools not on the list are missed, so the real figure is higher.`},{term:`Ran, reached and installed`,text:`Ran counts devices that started a tool's app or process. Reached counts devices that connected to its web domains. Installed counts devices with it installed, from Defender Vulnerability Management.`},{term:`Cloud Discovery`,text:`Generative AI apps Defender for Cloud Apps saw in firewall and proxy logs. It counts people per app, so it isn't added to the device figures.`},{term:`Posture`,text:`Each watched tool starts as Not reviewed. Mark it Sanctioned or Unsanctioned in the watchlist, defender/ai_watchlist.csv in the Lakehouse files or the landing container; sanctioned tools leave this page.`}];function bn(e){let t=gt[e.probe]??e.probe,n=e.status===`unlicensed`&&St(e.probe)||_t(e.status),r=/^\W*\d{3}\W*(failed)?\W*$/i.test(e.message??``)?``:e.message;return r?`${t}: ${n} (${r})`:`${t}: ${n}`}function xn({source:e}){return e===`absent`||e===`notConfigured`?(0,K.jsx)(Cn,{configured:e!==`notConfigured`}):e===`checking`?(0,K.jsx)(D,{id:f(`shadow-ai`),title:Z,description:Q,children:(0,K.jsx)(y,{})}):(0,K.jsx)(Sn,{})}function Sn(){let{theme:e}=g(),t=ue(),n=(0,j.useMemo)(()=>he(t,e),[t,e]),r=k(hn),i=O(gn),o=O(_n),[s,c]=(0,j.useState)(`Ran`),l=(0,j.useMemo)(()=>yt(o.table),[o.table]),u=(0,j.useMemo)(()=>vt(o.table),[o.table]),d=(0,j.useMemo)(()=>wt(i.table,s),[i.table,s]),ee=(0,j.useMemo)(()=>ge(Tt(gn.vegaLiteSpec,s),ht,[n.negative,n.caution]),[s,n]),te=V.find(e=>e.id===s)??V[0],_=Ct(l,s),v=r.row;return u?.kind===`notRun`?(0,K.jsx)(D,{id:f(`shadow-ai`),title:Z,description:Q,children:(0,K.jsx)(x,{title:`Defender hasn't run yet`,description:`The Defender source is on, but its first load hasn't finished. Shadow AI fills in after the next load and model refresh.`})}):u?.kind===`noAccess`?(0,K.jsx)(D,{id:f(`shadow-ai`),title:Z,description:Q,children:(0,K.jsx)(x,{title:`Defender refused every probe`,description:(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(`p`,{children:`Defender didn't share any data with the app, so there is nothing to show yet.`}),(0,K.jsxs)(S,{children:[(0,K.jsx)(`p`,{children:`Grant the app ThreatHunting.Read.All (and CloudApp-Discovery.Read.All for Cloud Discovery) with admin consent, check the tenant has Defender for Endpoint P2 or Defender for Cloud Apps, then let the next load run.`}),(0,K.jsx)(`p`,{children:`${u.failing.map(bn).join(`. `)}.`})]})]})})}):(0,K.jsxs)(D,{id:f(`shadow-ai`),title:Z,description:Q,children:[(0,K.jsx)(ye,{from:[r.notFilteredBy]}),u?.kind===`partial`&&(0,K.jsxs)(`div`,{role:`status`,className:`flex max-w-[80ch] items-start gap-200 text-[length:var(--text-300)] leading-300 text-muted-foreground`,children:[(0,K.jsx)(fe,{className:`icon-size-200 mt-[2px] shrink-0 text-caution`,"aria-hidden":`true`}),(0,K.jsxs)(`div`,{className:`flex flex-col gap-100`,children:[(0,K.jsx)(`p`,{children:`Some of Defender didn't load, so these figures leave it out.`}),(0,K.jsx)(S,{children:(0,K.jsx)(`p`,{children:`${u.failing.map(bn).join(`. `)}.`})})]})]}),(0,K.jsxs)(p,{summary:r,count:4,className:vn,emptyTitle:`No shadow AI figures`,emptyDescription:`The Defender tables are empty. Check the Defender source ran, then refresh the model.`,children:[(0,K.jsx)(w,{label:`Shadow AI tools found`,value:a(v,`[Tools Found]`),emphasis:!0,detail:(0,K.jsx)(T,{label:`Of tools watched`,value:a(v,`[Tools Watched]`)})}),(0,K.jsx)(w,{label:`Found this week`,value:a(v,`[Tools This Week]`),detail:(0,K.jsx)(T,{label:`Marked unsanctioned`,value:a(v,`[Unsanctioned Tools]`)})}),(0,K.jsx)(w,{label:`Devices`,value:a(v,`[Devices]`)}),(0,K.jsx)(w,{label:`People`,value:a(v,`[Users]`),detail:(0,K.jsx)(T,{label:`In Cloud Discovery`,value:a(v,`[Cloud Users]`)})})]}),(0,K.jsxs)(`div`,{className:`grid grid-cols-1 gap-500 xl:grid-cols-[minmax(0,1fr)_320px]`,children:[(0,K.jsxs)(`div`,{className:`flex flex-col gap-300`,children:[(0,K.jsx)(le,{label:`Seen by`,className:`self-start`,options:V.map(e=>({id:e.id,label:e.label,hint:bt(l,e.id)?`${Ct(l,e.id).title}.`:e.subtitle})),value:s,onChange:c}),(0,K.jsx)(h,{result:i,table:d,spec:ee,height:me(d?.rows.length??6),title:`Shadow AI tools`,subtitle:te.subtitle,emptyTitle:_.title,emptyDescription:_.description})]}),(0,K.jsx)(`div`,{className:`self-start`,children:(0,K.jsx)(m,{title:`How to read this`,notes:yn})})]})]})}function Cn({configured:e}){return(0,K.jsx)(D,{id:f(`shadow-ai`),title:Z,description:Q,children:(0,K.jsx)(x,{title:e?`Connect Microsoft Defender`:`Defender isn't turned on`,description:(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(`p`,{children:`Shadow AI comes from Microsoft Defender, which isn't connected yet.`}),(0,K.jsx)(S,{children:(0,K.jsx)(`p`,{children:e?`Shadow AI reads Microsoft Defender advanced hunting, and the model has no Defender data yet. Run the Defender source (or the installer again with Defender ticked), let the next load finish, then reopen the app.`:`Optional. Run the installer again and tick Defender (shadow AI and agent risk). It needs Defender for Endpoint P2 or Defender for Cloud Apps and the ThreatHunting.Read.All permission; Shadow AI fills in after the next load and model refresh.`})})]})})})}var wn={registry:I(`registry`),registryOwnerFallback:I(`registryOwnerFallback`),resourceGraph:I(`resourceGraph`)},Tn=[`estate-health`,`exposure`,`accountability`,`review-queue`],$=`Who owns your agents, who can reach them, and what needs a review.`;function En(){let e=C(),{show:t}=se(),n=Tn.some(t);return(0,K.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[n&&(0,K.jsx)(Dn,{sources:e}),t(`shadow-ai`)&&(0,K.jsx)(xn,{source:e.defender})]})}function Dn({sources:e}){return r(e,`agentRegistry`)?r(e,`resourceGraph`)?(0,K.jsx)(Mn,{configured:e.resourceGraph!==`notConfigured`}):(0,K.jsx)(kn,{}):(0,K.jsx)(On,{})}function On(){let e=M(`governance`),t=M(`governanceOwnerFallback`);return e.status===`outdated`?(0,K.jsx)(Nn,{missing:e.missing}):e.status===`checking`||t.status===`checking`?(0,K.jsx)(jn,{}):(0,K.jsx)(An,{mode:t.status===`ok`?`registryOwnerFallback`:`registry`})}function kn(){let e=M(`governanceResourceGraph`);return e.status===`outdated`?(0,K.jsx)(Nn,{missing:e.missing}):e.status===`checking`?(0,K.jsx)(jn,{}):(0,K.jsx)(An,{mode:`resourceGraph`})}function An({mode:e}){let t=k(wn[e]),{show:n}=se();return(0,K.jsxs)(`div`,{className:`flex flex-col gap-800`,children:[n(`estate-health`)&&(0,K.jsx)(nn,{summary:t,mode:e}),n(`exposure`)&&(0,K.jsx)(dn,{mode:e}),n(`accountability`)&&(0,K.jsx)(Kt,{summary:t,mode:e}),n(`review-queue`)&&(0,K.jsx)(mn,{mode:e})]})}function jn(){return(0,K.jsx)(D,{id:f(`estate-health`),title:`Governance`,description:$,children:(0,K.jsx)(y,{})})}function Mn({configured:e}){return(0,K.jsx)(D,{id:f(`estate-health`),title:`Governance`,description:$,children:(0,K.jsx)(x,{title:e?`No agent data yet`:`Turn on Azure Resource Graph`,description:(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(`p`,{children:`Governance reads your Copilot Studio agents from Azure Resource Graph, which needs no Agent 365 licence. The Agent 365 registry is optional: it adds Microsoft and partner agents.`}),(0,K.jsx)(S,{children:(0,K.jsx)(`p`,{children:e?`Azure Resource Graph is turned on, but no agents have loaded yet. Run the load, let the model refresh, then reopen the app.`:`Run the installer again and tick Azure Resource Graph. Governance fills in after the next load and model refresh. To add Microsoft and partner agents too, tick Agent 365 registry as well.`})})]})})})}function Nn({missing:e}){return(0,K.jsx)(D,{id:f(`estate-health`),title:`Governance`,description:$,children:(0,K.jsx)(re,{missing:e})})}export{En as GovernanceScreen};