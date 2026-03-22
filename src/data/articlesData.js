export const articles = [
  {
    slug: "wso2-sso-custom-claims-roles",
    title: "WSO2 Identity Server SSO Integration",
    subtitle: "Connecting Applications with Custom Claims & Role-Based Access",
    author: "Anuka Fonseka",
    description:
      "A practical guide to integrating applications with WSO2 IS 7.1.0 using custom role-based claims like isAdmin when the user store is a read-only LDAP.",
    date: "February 2026",
    tags: ["WSO2", "SSO", "OIDC", "LDAP", "Identity"],
    readTime: "12 min read",
    content: [
      {
        type: "environment",
        text: "Environment: WSO2 Identity Server 7.1.0 · Use Case: Custom role-based claims with read-only LDAP",
      },
      {
        type: "section",
        title: "Scenario Overview",
        body: `This guide covers a common real-world scenario: you have a read-only LDAP user store connected to WSO2 IS, and you need to inject a custom claim like isAdmin: Y/N into the token at login time — without modifying the LDAP.\n\nThe solution uses WSO2 local roles combined with an adaptive authentication script that dynamically sets the isAdmin claim value based on the user's role.`,
      },
      {
        type: "architecture",
        steps: [
          "User logs in",
          "WSO2 Conditional Auth Script runs",
          "Script checks user's WSO2 local role (e.g., Internal/FFSP_Admin)",
          "Injects isAdmin = 'Y' or 'N' into local claims",
          "WSO2 includes isAdmin in userinfo response",
          "Application reads isAdmin from userinfo endpoint",
        ],
      },
      {
        type: "section",
        title: "Step 1: Create Local Roles in WSO2 IS",
        body: `Since the LDAP is read-only, create roles directly in WSO2 IS. These are stored in WSO2's internal role store — no LDAP write access needed.\n\nGo to Console → User Management → Roles and create:\n• FFSP_Admin (for admin users)\n• FFSP_User (for regular users)\n\nThen assign your LDAP users to these roles from the WSO2 IS console.`,
      },
      {
        type: "callout",
        variant: "warning",
        title: "Important",
        body: `Roles created in the WSO2 IS console are stored internally with the prefix Internal/. So FFSP_Admin is actually Internal/FFSP_Admin internally. This matters when using hasRole() in adaptive scripts.`,
      },
      {
        type: "section",
        title: "Step 2: Create a Custom Local Claim for isAdmin",
        body: "Go to User Attributes & Stores → Attributes → Add New Attribute and fill in the following:",
      },
      {
        type: "table",
        headers: ["Field", "Value"],
        rows: [
          ["Attribute Name", "isAdmin"],
          ["Attribute URI", "http://wso2.org/claims/isAdmin"],
          ["Display Name", "isAdmin"],
          ["Mapped Attribute", "Leave empty or add a default placeholder like 'N' (value will be set by the adaptive script)"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Note",
        body: "Repeat this for any other custom claims needed (e.g., userNo, userName) — except for those that already map to existing LDAP attributes like givenName, sn, mail.",
      },
      {
        type: "section",
        title: "Step 3: Create a Custom OIDC Scope",
        body: `This groups the custom claims together so the application can request them in one scope.\n\nGo to Console → User Attributes & Stores → Attributes → OpenID Connect → Scopes, create a new scope named ffsp_claims, and add the following attributes to it:\n• isAdmin\n• userNo\n• userName`,
      },
      // {
      //   type: "section",
      //   title: "Step 4: Add OIDC External Claim Mappings",
      //   body: "This step bridges the local claim layer to the OIDC token layer. Without this, claims will have values internally but won't appear in the JWT or userinfo response.\n\nGo to Claims → Add → Add External Claim, select dialect http://wso2.org/oidc/claim, and add:",
      // },
      // {
      //   type: "table",
      //   headers: ["External Claim URI (OIDC)", "Mapped Local Claim"],
      //   rows: [
      //     ["http://wso2.org/oidc/claim/isAdmin", "http://wso2.org/claims/isAdmin"],
      //     ["http://wso2.org/oidc/claim/userNo", "http://wso2.org/claims/userNo"],
      //     ["http://wso2.org/oidc/claim/userName", "http://wso2.org/claims/userName"],
      //   ],
      // },
      {
        type: "section",
        title: "Step 4: Register the Application as a Service Provider",
        body: "Go to Console → Applications → Add Application, choose Application Type → OIDC, and configure:",
      },
      {
        type: "table",
        headers: ["Setting", "Value"],
        rows: [
          ["Redirect URL(s)", "https://your-app.com/oidc/callback"],
          ["Logout URL", "https://your-app.com/oidc/logout"],
          ["PKCE", "Enable (recommended)"],
        ],
      },
      {
        type: "body",
        text: `Under User Attributes, Select scopes that are allowed to be shared with this application e.g., 'ffsp_claims' and add all required claims, marking them as requested/mandatory:`,
      },
      {
        type: "table",
        headers: ["Claim URI", "Requested", "Mandatory"],
        rows: [
          ["http://wso2.org/claims/emailaddress", "✅", "✅"],
          ["http://wso2.org/claims/givenname", "✅", "✅"],
          ["http://wso2.org/claims/lastname", "✅", "✅"],
          ["http://wso2.org/claims/isAdmin", "✅", "✅"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Commonly Missed Step",
        body: "Even if the claim exists and has a value, WSO2 won't include it in the userinfo response unless it's explicitly requested in the Service Provider User Attribute configuration.",
      },
      {
        type: "section",
        title: "Step 5: Add the Conditional Authentication Script",
        body: "In the Service Provider, go to Login Flow → Enable Conditional Authentication and add:",
      },
      {
        type: "code",
        language: "javascript",
        label: "Conditional Authentication Script",
        code: `var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function(context) {
            var user = context.currentKnownSubject;
            var isAdmin = 'N';

            // Check WSO2 local role
            if (hasRole(user, 'Internal/FFSP_Admin')) {
                isAdmin = 'Y';
            }

            // Inject the value into the claim
            user.localClaims['http://wso2.org/claims/isAdmin'] = isAdmin;
        }
    });
};`,
      },
      {
        type: "section",
        title: "Critical Gotcha: The Internal/ Role Prefix",
        body: `This is the most common pitfall when using hasRole() in adaptive scripts.\n\nWhen you create a role called FFSP_Admin in the WSO2 IS console, it's stored internally as Internal/FFSP_Admin. The UI displays it without the prefix — which is misleading.\n\nSymptom: The userinfo response shows roles: "FFSP_Admin" (confirming role assignment works), but isAdmin stays N because hasRole(user, 'FFSP_Admin') silently returns false.`,
      },
      {
        type: "code",
        language: "javascript",
        label: "Role Prefix Fix",
        code: `// ❌ This silently fails
if (hasRole(user, 'FFSP_Admin'))

// ✅ This works correctly
if (hasRole(user, 'Internal/FFSP_Admin'))`,
      },
      {
        type: "table",
        headers: ["Role Type", "Prefix", "Example"],
        rows: [
          ["Created in WSO2 IS console", "Internal/", "Internal/FFSP_Admin"],
          ["Synced from LDAP", "<UserStoreName>/", "PRIMARY/Managers"],
          ["Application-scoped role", "Application/", "Application/myapp/Admin"],
        ],
      },
      {
        type: "code",
        language: "javascript",
        label: "Debugging Script",
        code: `var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function(context) {
            var user = context.currentKnownSubject;

            // Log for debugging — check wso2carbon.log after login
            Log.info("User roles: " + user.roles);
            Log.info("Has FFSP_Admin: " + hasRole(user, 'FFSP_Admin'));
            Log.info("Has Internal/FFSP_Admin: " + hasRole(user, 'Internal/FFSP_Admin'));

            var isAdmin = 'N';
            if (hasRole(user, 'Internal/FFSP_Admin')) {
                isAdmin = 'Y';
            }
            user.localClaims['http://wso2.org/claims/isAdmin'] = isAdmin;
        }
    });
};`,
      },
      {
        type: "body",
        text: "The output will appear in <WSO2_HOME>/repository/logs/wso2carbon.log.",
      },
      {
        type: "section",
        title: "Application Implementation (Laravel + Vue.js)",
        body: "Frontend: Initiating SSO Login",
      },
      {
        type: "code",
        language: "javascript",
        label: "Vue.js — Initiate Login",
        code: `const initiateOAuth2Login = async () => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  sessionStorage.setItem('code_verifier', codeVerifier);

  const authUrl = new URL('https://your-wso2-host:9443/oauth2/authorize');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', 'YOUR_CLIENT_ID');
  authUrl.searchParams.append('redirect_uri', window.location.origin + '/your-app/login');
  authUrl.searchParams.append('scope', 'openid email profile ffsp_claims');
  authUrl.searchParams.append('state', 'request_' + Date.now());
  authUrl.searchParams.append('code_challenge', codeChallenge);
  authUrl.searchParams.append('code_challenge_method', 'S256');

  window.location.href = authUrl.toString();
};`,
      },
      {
        type: "code",
        language: "javascript",
        label: "Vue.js — Handle Callback",
        code: `onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const sessionState = urlParams.get('session_state');

  if (code && sessionState) {
    const tokenResponse = await exchangeCodeForTokens(code);

    if (tokenResponse.access_token) {
      axios.post('/auth/oauth2/login', {
        oauth2_access_token: tokenResponse.access_token
      }).then((response) => {
        if (response.data.success) {
          // handle successful login
        }
      });
    }
  }
});`,
      },
      {
        type: "code",
        language: "php",
        label: "Laravel — Read Claims from WSO2 Userinfo",
        code: `private function getUserInfoFromWSO2($accessToken)
{
    $response = Http::withToken($accessToken)
        ->withOptions(['verify' => false]) // remove in production
        ->get(config('services.wso2.userinfo_endpoint'));

    if ($response->successful()) {
        $data = $response->json();
        Log::info('WSO2 userinfo raw response', ['data' => $data]);

        return [
            'sub'        => $data['sub'] ?? null,
            'email'      => $data['email'] ?? null,
            'epf'        => $data['epf'] ?? null,
            'first_name' => $data['given_name'] ?? null,
            'last_name'  => $data['family_name'] ?? null,
            'isAdmin'    => $data['isAdmin'] ?? 'N',
        ];
    }

    return null;
}`,
      },
      {
        type: "section",
        title: "Sharing Details with Vendors",
        body: "When a vendor requests to integrate with your WSO2 IS instance, provide them with:\n\n1. Client ID — generated by WSO2 when you register their app\n2. Authorization endpoint — https://your-wso2-host:9443/oauth2/authorize\n3. Token endpoint — https://your-wso2-host:9443/oauth2/token\n4. Userinfo endpoint — https://your-wso2-host:9443/oauth2/userinfo\n5. Scope to request custom claims — e.g., openid profile ffsp_claims\n6. Claim names — isAdmin, userNo, userName (as they appear in userinfo)\n7. Sample credentials — a test user assigned to the appropriate WSO2 role",
      },
      {
        type: "checklist",
        title: "Debugging Checklist",
        items: [
          "Local claim exists at http://wso2.org/claims/isAdmin",
          "Claim is added to the custom OIDC scope (ffsp_claims)",
          "Claim is added to the Service Provider's Claim Configuration and marked as Requested",
          "Conditional script is enabled in the Service Provider's authentication config",
          "hasRole() uses the correct prefixed role name (e.g., Internal/FFSP_Admin)",
          "The scope ffsp_claims is included in the authorization request from the frontend",
          "Test by calling the userinfo endpoint directly with Postman to isolate WSO2 vs app issues",
        ],
      },
    ],
  },
];