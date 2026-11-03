import{E as e,h as t}from"./utils-CCoPj5LP.js";import{Z as n}from"./task-times.context-WIEQAetj.js";var r=`DEFINE\r
    MEASURE 'Agents 365'[Registry Agents Seen In Use] =\r
        IF(\r
            [Agent Registry Records] > 0,\r
            COALESCE(\r
                COUNTROWS(\r
                    FILTER(\r
                        VALUES('Agents 365'[Title ID]),\r
                        NOT ISBLANK('Agents 365'[Title ID])\r
                            && NOT ISBLANK([Observed Agent Sessions])\r
                    )\r
                ),\r
                0\r
            )\r
        )\r
    MEASURE 'Agents 365'[Sessions Outside Registry] =\r
        CALCULATE([Observed Agent Sessions], ISBLANK('Agents 365'[Title ID]))\r
EVALUATE\r
ROW(\r
    "Registry Agents", [Agent Registry Records],\r
    "Tenant Built", [Agents Built In Tenant],\r
    "Seen In Use", [Registry Agents Seen In Use],\r
    "Unmatched Sessions", [Sessions Outside Registry],\r
    "Registry Updated", [Agent Registry Freshness]\r
)`,i={"[Registry Agents]":{name:`Registry Agents`,displayName:`Agents in the registry`,format:`#,0`},"[Tenant Built]":{name:`Tenant Built`,displayName:`Built in this tenant`,format:`#,0`},"[Seen In Use]":{name:`Seen In Use`,displayName:`Seen in use`,format:`#,0`},"[Unmatched Sessions]":{name:`Unmatched Sessions`,displayName:`Sessions outside the registry`,format:`#,0`},"[Registry Updated]":{name:`Registry Updated`,displayName:`Registry updated`}};function a(){return{connection:`vl`,query:r,columnMetadata:i,filters:n}}function o(t){let n=e(t,`[Registry Agents]`),r=e(t,`[Seen In Use]`)??0,i=e(t,`[Unmatched Sessions]`)??0;return n===void 0?{kind:`unknown`}:i>0&&r===0?{kind:`none`,unmatchedSessions:i,registryAgents:n}:i>0?{kind:`partial`,unmatchedSessions:i,seenInUse:r,registryAgents:n}:r>0?{kind:`complete`,seenInUse:r,registryAgents:n}:{kind:`unknown`}}var s=`EVALUATE\r
// Every registered agent, used or not. The model relates the audit log and\r
// the registry in both directions, so a date or people filter on the log\r
// would otherwise shrink the registry to the agents it matched. One-way keeps\r
// the list whole; the usage measures below still see every filter. Removing\r
// the audit table's filters would not do: its expanded table takes in the\r
// registry, so the agent type filter would go too.\r
VAR _catalogue =\r
    CALCULATETABLE(\r
        SUMMARIZE(\r
            FILTER('Agents 365', NOT ISBLANK('Agents 365'[Title ID])),\r
            'Agents 365'[Title ID],\r
            'Agents 365'[Agent name],\r
            'Agents 365'[Agent Type Label],\r
            'Agents 365'[Creator],\r
            'Agents 365'[Agent Features],\r
            'Agents 365'[Agent Lifecycle],\r
            'Agents 365'[Agent Usage Review],\r
            'Agents 365'[Agent description]\r
        ),\r
        CROSSFILTER(\r
            'Chat + Agent Interactions (Audit Logs)'[Agent_LinkID],\r
            'Agents 365'[Title ID],\r
            OneWay\r
        )\r
    )\r
VAR _registered =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            ADDCOLUMNS(\r
                _catalogue,\r
                "@Users", [Active Agent Users],\r
                "@Sessions", [Observed Agent Sessions],\r
                "@PerUser", [Observed Agent Sessions per User],\r
                "@Orgs", [Agent Orgs],\r
                "@LastSeen", [Agent Last Observed Activity]\r
            ),\r
            // Picking agents by name filters the audit log, which the list no\r
            // longer follows, so then a registered agent stays only if it was used.\r
            NOT ISFILTERED('Chat + Agent Interactions (Audit Logs)'[AgentName])\r
                || NOT ISBLANK([@Sessions])\r
        ),\r
        "Agent", 'Agents 365'[Agent name],\r
        "Registry Id", 'Agents 365'[Title ID],\r
        "Agent Key", "registry:" & 'Agents 365'[Title ID],\r
        "In Registry", TRUE(),\r
        "Type", 'Agents 365'[Agent Type Label],\r
        "Creator", 'Agents 365'[Creator],\r
        "Users", [@Users],\r
        "Sessions", [@Sessions],\r
        "Sessions Per User", [@PerUser],\r
        "Orgs Reached", [@Orgs],\r
        "Last Activity", [@LastSeen],\r
        "Features", 'Agents 365'[Agent Features],\r
        "Lifecycle", 'Agents 365'[Agent Lifecycle],\r
        "Adoption", 'Agents 365'[Agent Usage Review],\r
        "Description", 'Agents 365'[Agent description]\r
    )\r
// Agents the audit log names but no registry entry matches. The report's\r
// registry table leaves them out, yet in some tenants they carry all of the\r
// agent use, so they are ranked with their usage and no registry details.\r
// "Draft as 1P Agent" is left out, as on the report's Leaderboard page.\r
VAR _unregistered =\r
    SELECTCOLUMNS(\r
        FILTER(\r
            SUMMARIZECOLUMNS(\r
                'Chat + Agent Interactions (Audit Logs)'[AgentName],\r
                FILTER(ALL('Agents 365'[Title ID]), ISBLANK('Agents 365'[Title ID])),\r
                "@Users", [Active Agent Users],\r
                "@Sessions", [Observed Agent Sessions],\r
                "@PerUser", [Observed Agent Sessions per User],\r
                "@Orgs", [Agent Orgs],\r
                "@LastSeen", [Agent Last Observed Activity]\r
            ),\r
            NOT ISBLANK([@Sessions])\r
                && 'Chat + Agent Interactions (Audit Logs)'[AgentName] <> "Draft as 1P Agent"\r
        ),\r
        "Agent",\r
            VAR _name = 'Chat + Agent Interactions (Audit Logs)'[AgentName]\r
            RETURN IF(LEN(TRIM(_name)) = 0, "Unnamed agent", _name),\r
        "Registry Id", BLANK(),\r
        "Agent Key", "audit:" & IF(ISBLANK('Chat + Agent Interactions (Audit Logs)'[AgentName]), "blank", "text:" & 'Chat + Agent Interactions (Audit Logs)'[AgentName]),\r
        "In Registry", FALSE(),\r
        "Type", "Not in registry",\r
        "Creator", BLANK(),\r
        "Users", [@Users],\r
        "Sessions", [@Sessions],\r
        "Sessions Per User", [@PerUser],\r
        "Orgs Reached", [@Orgs],\r
        "Last Activity", [@LastSeen],\r
        "Features", BLANK(),\r
        "Lifecycle", BLANK(),\r
        "Adoption", BLANK(),\r
        "Description", BLANK()\r
    )\r
VAR _all = UNION(_registered, _unregistered)\r
VAR _inUse = COUNTROWS(FILTER(_all, [Users] > 0)) + 0\r
VAR _registeredCount = COUNTROWS(FILTER(_all, [In Registry])) + 0\r
VAR _total = COUNTROWS(_all)\r
// Only list rows leave the model. Spotlight maxima and tie counts cover all\r
// agents, even if thousands tie beyond the cap; only two names are spelled out.\r
VAR _listed =\r
    TOPN(\r
        1000,\r
        _all,\r
        [Users], DESC,\r
        [Sessions], DESC,\r
        [Agent], ASC,\r
        [Registry Id], ASC,\r
        [Type], ASC,\r
        [Creator], ASC,\r
        [Agent Key], ASC\r
    )\r
VAR _maxSessions = MAXX(_all, [Sessions])\r
VAR _maxOrgs = MAXX(_all, [Orgs Reached])\r
VAR _sessionLeaders = FILTER(_all, _maxSessions > 0 && [Sessions] = _maxSessions)\r
VAR _orgLeaders = FILTER(_all, _maxOrgs > 0 && [Orgs Reached] = _maxOrgs)\r
VAR _sessionCount = COUNTROWS(_sessionLeaders) + 0\r
VAR _orgCount = COUNTROWS(_orgLeaders) + 0\r
VAR _sessionNames =\r
    CONCATENATEX(\r
        TOPN(2, _sessionLeaders, [Users], DESC, [Sessions], DESC, [Agent], ASC, [Agent Key], ASC),\r
        IF(LEN(TRIM([Agent])) = 0, "Unnamed agent", TRIM([Agent])),\r
        IF(_sessionCount = 2, " and ", ", "),\r
        [Users], DESC, [Sessions], DESC, [Agent], ASC, [Agent Key], ASC\r
    )\r
    & IF(_sessionCount > 2, " and " & FORMAT(_sessionCount - 2, "0") & IF(_sessionCount = 3, " other", " others"), "")\r
VAR _orgNames =\r
    CONCATENATEX(\r
        TOPN(2, _orgLeaders, [Users], DESC, [Sessions], DESC, [Agent], ASC, [Agent Key], ASC),\r
        IF(LEN(TRIM([Agent])) = 0, "Unnamed agent", TRIM([Agent])),\r
        IF(_orgCount = 2, " and ", ", "),\r
        [Users], DESC, [Sessions], DESC, [Agent], ASC, [Agent Key], ASC\r
    )\r
    & IF(_orgCount > 2, " and " & FORMAT(_orgCount - 2, "0") & IF(_orgCount = 3, " other", " others"), "")\r
RETURN\r
    ADDCOLUMNS(\r
        _listed,\r
        "In Use", _inUse,\r
        "Registered", _registeredCount,\r
        "Total", _total,\r
        "Top Sessions", _maxSessions + 0,\r
        "Session Leaders", _sessionNames,\r
        "Session Leader Count", _sessionCount,\r
        "Top Orgs", _maxOrgs + 0,\r
        "Org Leaders", _orgNames,\r
        "Org Leader Count", _orgCount\r
    )\r
ORDER BY [Users] DESC, [Sessions] DESC, [Agent] ASC, [Registry Id] ASC, [Type] ASC, [Creator] ASC, [Agent Key] ASC\r
`,c={"[Agent]":{name:`Agent`,displayName:`Agent`},"[Registry Id]":{name:`Registry Id`,displayName:`Registry ID`},"[Agent Key]":{name:`Agent Key`},"[In Registry]":{name:`In Registry`,displayName:`In registry`},"[Type]":{name:`Type`,displayName:`Type`},"[Creator]":{name:`Creator`,displayName:`Creator`},"[Users]":{name:`Users`,displayName:`Users`,format:`#,0`},"[Sessions]":{name:`Sessions`,displayName:`Sessions`,format:`#,0`},"[Sessions Per User]":{name:`Sessions Per User`,displayName:`Sessions / user`,format:`0.0`},"[Orgs Reached]":{name:`Orgs Reached`,displayName:`Orgs reached`,format:`#,0`},"[Last Activity]":{name:`Last Activity`,displayName:`Last activity`},"[Features]":{name:`Features`,displayName:`Available in`},"[Lifecycle]":{name:`Lifecycle`,displayName:`Lifecycle stage`},"[Adoption]":{name:`Adoption`,displayName:`Adoption`},"[Description]":{name:`Description`,displayName:`Description`},"[Top Sessions]":{name:`Top Sessions`,format:`#,0`},"[Session Leaders]":{name:`Session Leaders`},"[Session Leader Count]":{name:`Session Leader Count`,format:`#,0`},"[Top Orgs]":{name:`Top Orgs`,format:`#,0`},"[Org Leaders]":{name:`Org Leaders`},"[Org Leader Count]":{name:`Org Leader Count`,format:`#,0`},"[In Use]":{name:`In Use`,displayName:`In use`,format:`#,0`},"[Registered]":{name:`Registered`,displayName:`Registered`,format:`#,0`},...t};function l(){return{connection:`vl`,query:s,columnMetadata:c}}var u=/[\p{Extended_Pictographic}\uFE0F\u200D]+/gu;function d(e){if(!e)return;let t=e.split(u).map(e=>e.trim()).filter(Boolean);if(t.length!==0&&t.every(e=>/^in\s+\S/i.test(e)))return t.map(e=>e.replace(/^in\s+/i,``))}function f(e){return typeof e==`string`&&e.trim()!==``?e.trim():void 0}function p(e){return typeof e==`number`&&Number.isFinite(e)?e:void 0}function m(e){return(typeof e==`string`?/^\d{4}-\d{2}-\d{2}/.exec(e):null)?.[0]}function h(e){let t=new Map(e.columns.map((e,t)=>[e.name,t])),n=new Map;return e.rows.map(e=>{let r=n=>{let r=t.get(n);return r===void 0?void 0:e[r]},i=f(r(`Agent`))??`Unnamed agent`,a=f(r(`Registry Id`)),o=f(r(`Features`)),s=typeof r(`Agent Key`)==`string`?r(`Agent Key`):a??`audit:${i}`,c=n.get(s)??0;return n.set(s,c+1),{key:c===0?s:`${s}#${c+1}`,name:i,registryId:a,inRegistry:r(`In Registry`)===!0,type:f(r(`Type`)),creator:f(r(`Creator`)),users:p(r(`Users`))??0,sessions:p(r(`Sessions`))??0,orgsReached:p(r(`Orgs Reached`))??0,sessionsPerUser:p(r(`Sessions Per User`)),lastActivity:m(r(`Last Activity`)),features:o,surfaces:d(o),lifecycle:f(r(`Lifecycle`)),adoption:f(r(`Adoption`)),description:f(r(`Description`))}})}var g=`EVALUATE\r
-- The model's \`Cowork Readiness Rank (Dynamic)\` builds this scored table again\r
-- for every person it ranks, so its cost grows with the square of the user\r
-- count. It is built once here, as the measure builds it for one person with\r
-- no organization in scope. Inside the measure, ALLSELECTED brings back the\r
-- filters this query runs under, which are the users VALUES sees here.\r
VAR __Scope =\r
    FILTER(\r
        ADDCOLUMNS(\r
            VALUES('Chat + Agent Interactions (Audit Logs)'[Audit_UserId]),\r
            "@b", [Cowork Readiness: Surfaces Per Day],\r
            "@d", CALCULATE([Prompts per Observed Session], KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Is_Cowork] = FALSE())),\r
            "@a", IF(COALESCE(CALCULATE([Observed Agent Sessions]), 0) > 0, 1, 0),\r
            "@cw", COALESCE(CALCULATE([Observed Sessions], KEEPFILTERS('Chat + Agent Interactions (Audit Logs)'[Is_Cowork] = TRUE())), 0)\r
        ),\r
        [@cw] = 0 && NOT ISBLANK([@b]) && NOT ISBLANK([@d])\r
    )\r
VAR __MaxB = MAXX(__Scope, [@b])\r
VAR __MaxD = MAXX(__Scope, [@d])\r
VAR __Scored =\r
    ADDCOLUMNS(\r
        __Scope,\r
        "@s",\r
            ROUND(\r
                45 * MIN(DIVIDE([@b], __MaxB, 0), 1)\r
                    + 35 * MIN(DIVIDE([@d], __MaxD, 0), 1)\r
                    + 20 * [@a],\r
                0\r
            )\r
    )\r
-- A dense rank is one more than the number of distinct higher scores.\r
VAR __Scores = DISTINCT(SELECTCOLUMNS(__Scored, "@Value", [@s]))\r
VAR __Depths = COUNTROWS(DISTINCT(SELECTCOLUMNS(__Scope, "@Depth", [@d])))\r
VAR __Total = COUNTROWS(__Scope)\r
RETURN\r
SELECTCOLUMNS(\r
    TOPN(\r
        1000,\r
        __Scored,\r
        [@s], DESC,\r
        [@b], DESC,\r
        'Chat + Agent Interactions (Audit Logs)'[Audit_UserId], ASC\r
    ),\r
    "Rank",\r
        VAR __Score = [@s]\r
        RETURN COUNTROWS(FILTER(__Scores, [@Value] > __Score)) + 1,\r
    "User", 'Chat + Agent Interactions (Audit Logs)'[Audit_UserId],\r
    "Organization",\r
        LOOKUPVALUE(\r
            'Chat + Agent Org Data'[Organization],\r
            'Chat + Agent Org Data'[PersonId], 'Chat + Agent Interactions (Audit Logs)'[Audit_UserId]\r
        ),\r
    "Surfaces Per Day", [@b],\r
    "Prompts Per Session", [@d],\r
    "Uses Agents", IF(COALESCE([Cowork Fit: Agent User Share], 0) > 0, "Yes", "No"),\r
    "Depths", __Depths,\r
    "Total", __Total\r
)\r
ORDER BY [Rank], [Surfaces Per Day] DESC, [User]`,_={"[Rank]":{name:`Rank`,displayName:`Rank`,format:`#,0`},"[User]":{name:`User`,displayName:`User`},"[Organization]":{name:`Organization`,displayName:`Organization`},"[Surfaces Per Day]":{name:`Surfaces Per Day`,displayName:`Apps per active day`,format:`0.0`},"[Prompts Per Session]":{name:`Prompts Per Session`,displayName:`Prompts per session`,format:`0.0`},"[Uses Agents]":{name:`Uses Agents`,displayName:`Uses agents`},"[Depths]":{name:`Depths`,displayName:`Distinct prompts per session`,format:`#,0`},...t};function v(){return{connection:`vl`,query:g,columnMetadata:_}}function y(e){let t=e.columns.findIndex(e=>e.name===`Depths`);return t>=0&&e.rows[0]?.[t]===1}export{a,h as i,y as n,o,l as r,v as t};