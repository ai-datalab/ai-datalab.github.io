import{i as e}from"./rolldown-runtime-Dd_uD5pT.js";import{_ as t,d as n,n as r,u as i}from"./createLucideIcon-CpejIyV8.js";import{T as a}from"./utils-BJOTqCrL.js";import{t as o}from"./use-table-query-X_m8aLWs.js";var s=`EVALUATE\r
VAR _people = DISTINCTCOUNT('M365 Activity'[UPN_Normalized])\r
VAR _concealed =\r
    COUNTROWS(\r
        FILTER(\r
            VALUES('M365 Activity'[UPN_Normalized]),\r
            NOT CONTAINSSTRING('M365 Activity'[UPN_Normalized], "@")\r
        )\r
    )\r
RETURN\r
ROW(\r
    "Rows", COUNTROWS('M365 Activity'),\r
    "People", _people,\r
    "First Date", FORMAT(MIN('M365 Activity'[ActivityDate]), "yyyy-MM-dd"),\r
    "Last Date", FORMAT(MAX('M365 Activity'[ActivityDate]), "yyyy-MM-dd"),\r
    "Concealed Share", DIVIDE(COALESCE(_concealed, 0), _people)\r
)\r
`,c={"[Rows]":{name:`Rows`,displayName:`Rows`,format:`#,0`},"[People]":{name:`People`,displayName:`People`,format:`#,0`},"[First Date]":{name:`First Date`,displayName:`First date`},"[Last Date]":{name:`Last Date`,displayName:`Last date`},"[Concealed Share]":{name:`Concealed Share`,displayName:`Concealed names`,format:t}};function l(){return{connection:`vl`,query:s,columnMetadata:c}}var u=.5,d=/cannot find table|failed to resolve name|M365 Activity'? (?:was not found|cannot be found|does not exist)/i;function f(e){return e.error===void 0?e.loaded?(i(e.row,`[Rows]`)??0)<=0?{state:`empty`,concealed:!1}:{state:`ready`,people:i(e.row,`[People]`),firstDate:n(e.row,`[First Date]`),lastDate:n(e.row,`[Last Date]`),concealed:(i(e.row,`[Concealed Share]`)??0)>u}:{state:`loading`,concealed:!1}:d.test(e.error)?{state:`missing`,concealed:!1}:{state:`error`,concealed:!1,error:e.error}}var p=e(r(),1),m=l(),h=[];function g(){let{row:e,loaded:t,error:n,refetch:r}=o(m,h,a);return{...(0,p.useMemo)(()=>f({row:e,loaded:t,error:n}),[e,t,n]),refetch:r}}export{g as t};