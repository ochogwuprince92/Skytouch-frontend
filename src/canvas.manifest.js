export const manifest = {
  screens: {
    scr_lqraw0: { name: "Landing", route: "/", position: { "x": 160, "y": 220 } },
    scr_6rj92h: { name: "Pricing", route: "/pricing", position: { "x": 1560, "y": 220 } },
    scr_zj9rha: { name: "Jobs Listing", route: "/jobs", position: { "x": 160, "y": 2200 } },
    scr_no03pm: { name: "Job Details", route: "/jobs/1", position: { "x": 1560, "y": 2200 } },
    scr_sfhyc9: { name: "Companies", route: "/companies", position: { "x": 160, "y": 4180 } },
    scr_mwtzz4: { name: "Company Details", route: "/companies/1", position: { "x": 1560, "y": 4180 } },
    scr_ts3cw7: { name: "Login", route: "/auth/login", position: { "x": 160, "y": 6160 } },
    scr_jceoer: { name: "Register", route: "/auth/register", position: { "x": 1560, "y": 6160 } },
    scr_e8e16d: { name: "Verify Email", route: "/auth/verify", position: { "x": 2960, "y": 6160 } },
    scr_uzov89: { name: "Forgot Password", route: "/auth/forgot-password", position: { "x": 4360, "y": 6160 } },
    scr_umronq: { name: "Reset Password", route: "/auth/reset-password", position: { "x": 5760, "y": 6160 } },
    scr_4v4q7v: { name: "Seeker Dashboard", route: "/seeker/dashboard", position: { "x": 160, "y": 8140 } },
    scr_yohguc: { name: "Seeker Profile", route: "/seeker/profile", position: { "x": 1560, "y": 8140 } },
    scr_g4qyd5: { name: "Seeker Applications", route: "/seeker/applications", position: { "x": 2960, "y": 8140 } },
    scr_07qf2e: { name: "Seeker Messages", route: "/seeker/messages", position: { "x": 4360, "y": 8140 } },
    scr_0uqdii: { name: "Seeker Settings", route: "/seeker/settings", position: { "x": 5760, "y": 8140 } },
    scr_ccresa: { name: "Employer Dashboard", route: "/employer/dashboard", position: { "x": 160, "y": 10120 } },
    scr_drauwj: { name: "Employer Jobs", route: "/employer/jobs", position: { "x": 1560, "y": 10120 } },
    scr_24r7tj: { name: "Employer ATS", route: "/employer/ats", position: { "x": 2960, "y": 10120 } },
    scr_8mfwk2: { name: "Employer Company", route: "/employer/company", position: { "x": 4360, "y": 10120 } },
    scr_glvqrr: { name: "Employer Messages", route: "/employer/messages", position: { "x": 5760, "y": 10120 } },
    scr_b33qie: { name: "Employer Analytics", route: "/employer/analytics", position: { "x": 7160, "y": 10120 } },
    scr_khh2hs: { name: "Employer Settings", route: "/employer/settings", position: { "x": 8560, "y": 10120 } },
    scr_nwplf0: { name: "Admin Dashboard", route: "/admin/dashboard", position: { "x": 160, "y": 12100 } },
    scr_a941mw: { name: "Admin Users", route: "/admin/users", position: { "x": 1560, "y": 12100 } },
    scr_b8x4m6: { name: "Admin Employers", route: "/admin/employers", position: { "x": 2960, "y": 12100 } },
    scr_3kdzvk: { name: "Admin Jobs Moderation", route: "/admin/jobs", position: { "x": 4360, "y": 12100 } },
    scr_72wlgp: { name: "Admin Subscriptions", route: "/admin/subscriptions", position: { "x": 5760, "y": 12100 } },
    scr_h6m8gf: { name: "Admin Audit Logs", route: "/admin/audit", position: { "x": 7160, "y": 12100 } },
    scr_bv0nid: { name: "Admin Settings", route: "/admin/settings", position: { "x": 8560, "y": 12100 } }
  },
  sections: {
    sec_5iqa9y: { name: "Landing & Public", x: 0, y: 0, width: 2920, height: 1180 },
    sec_dh49eg: { name: "Jobs browsing flow", x: 0, y: 1980, width: 2920, height: 1180 },
    sec_c6u3b8: { name: "Companies browsing flow", x: 0, y: 3960, width: 2920, height: 1180 },
    sec_y6nro1: { name: "Authentication flow", x: 0, y: 5940, width: 7120, height: 1180 },
    sec_oisazk: { name: "Seeker dashboard flow", x: 0, y: 7920, width: 7120, height: 1180 },
    sec_5gsnaq: { name: "Employer dashboard flow", x: 0, y: 9900, width: 9920, height: 1180 },
    sec_jut7wm: { name: "Admin dashboard flow", x: 0, y: 11880, width: 9920, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_5iqa9y", children: [
    { kind: "screen", id: "scr_lqraw0" },
    { kind: "screen", id: "scr_6rj92h" }]
  },
  { kind: "section", id: "sec_dh49eg", children: [
    { kind: "screen", id: "scr_zj9rha" },
    { kind: "screen", id: "scr_no03pm" }]
  },
  { kind: "section", id: "sec_c6u3b8", children: [
    { kind: "screen", id: "scr_sfhyc9" },
    { kind: "screen", id: "scr_mwtzz4" }]
  },
  { kind: "section", id: "sec_y6nro1", children: [
    { kind: "screen", id: "scr_ts3cw7" },
    { kind: "screen", id: "scr_jceoer" },
    { kind: "screen", id: "scr_e8e16d" },
    { kind: "screen", id: "scr_uzov89" },
    { kind: "screen", id: "scr_umronq" }]
  },
  { kind: "section", id: "sec_oisazk", children: [
    { kind: "screen", id: "scr_4v4q7v" },
    { kind: "screen", id: "scr_yohguc" },
    { kind: "screen", id: "scr_g4qyd5" },
    { kind: "screen", id: "scr_07qf2e" },
    { kind: "screen", id: "scr_0uqdii" }]
  },
  { kind: "section", id: "sec_5gsnaq", children: [
    { kind: "screen", id: "scr_ccresa" },
    { kind: "screen", id: "scr_drauwj" },
    { kind: "screen", id: "scr_24r7tj" },
    { kind: "screen", id: "scr_8mfwk2" },
    { kind: "screen", id: "scr_glvqrr" },
    { kind: "screen", id: "scr_b33qie" },
    { kind: "screen", id: "scr_khh2hs" }]
  },
  { kind: "section", id: "sec_jut7wm", children: [
    { kind: "screen", id: "scr_nwplf0" },
    { kind: "screen", id: "scr_a941mw" },
    { kind: "screen", id: "scr_b8x4m6" },
    { kind: "screen", id: "scr_3kdzvk" },
    { kind: "screen", id: "scr_72wlgp" },
    { kind: "screen", id: "scr_h6m8gf" },
    { kind: "screen", id: "scr_bv0nid" }]
  }]

};