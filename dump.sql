--
-- PostgreSQL database dump
--

\restrict S9wicSOTQTHSBT1oVHb03U8iP99GhesIko9VLfcej05LoScziCBBcHs5yxdCdkF

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg12+1)
-- Dumped by pg_dump version 18.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY brawltracker.player DROP CONSTRAINT IF EXISTS player_tag_fkey;
DROP INDEX IF EXISTS public.flyway_schema_history_s_idx;
ALTER TABLE IF EXISTS ONLY public.flyway_schema_history DROP CONSTRAINT IF EXISTS flyway_schema_history_pk;
ALTER TABLE IF EXISTS ONLY brawltracker.player DROP CONSTRAINT IF EXISTS player_pkey;
ALTER TABLE IF EXISTS ONLY brawltracker.listed_players DROP CONSTRAINT IF EXISTS listed_players_tag_key;
ALTER TABLE IF EXISTS ONLY brawltracker.listed_players DROP CONSTRAINT IF EXISTS listed_players_pkey;
ALTER TABLE IF EXISTS brawltracker.player ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS brawltracker.listed_players ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.flyway_schema_history;
DROP SEQUENCE IF EXISTS brawltracker.player_id_seq;
DROP TABLE IF EXISTS brawltracker.player;
DROP SEQUENCE IF EXISTS brawltracker.listed_players_id_seq;
DROP TABLE IF EXISTS brawltracker.listed_players;
-- *not* dropping schema, since initdb creates it
DROP SCHEMA IF EXISTS brawltracker;
--
-- Name: brawltracker; Type: SCHEMA; Schema: -; Owner: app
--

CREATE SCHEMA brawltracker;


ALTER SCHEMA brawltracker OWNER TO app;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: app
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO app;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: listed_players; Type: TABLE; Schema: brawltracker; Owner: app
--

CREATE TABLE brawltracker.listed_players (
    id bigint NOT NULL,
    tag character varying(20) NOT NULL
);


ALTER TABLE brawltracker.listed_players OWNER TO app;

--
-- Name: listed_players_id_seq; Type: SEQUENCE; Schema: brawltracker; Owner: app
--

CREATE SEQUENCE brawltracker.listed_players_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE brawltracker.listed_players_id_seq OWNER TO app;

--
-- Name: listed_players_id_seq; Type: SEQUENCE OWNED BY; Schema: brawltracker; Owner: app
--

ALTER SEQUENCE brawltracker.listed_players_id_seq OWNED BY brawltracker.listed_players.id;


--
-- Name: player; Type: TABLE; Schema: brawltracker; Owner: app
--

CREATE TABLE brawltracker.player (
    id bigint NOT NULL,
    tag character varying(20) NOT NULL,
    name character varying(100) NOT NULL,
    trophies integer,
    highest_trophies integer,
    exp_level integer,
    exp_points integer,
    total_prestige_level integer,
    solo_victories integer,
    duo_victories integer,
    three_vs_three_victories integer,
    best_robo_rumble_time integer,
    best_time_as_big_brawler integer,
    is_qualified_from_championship_challenge boolean,
    club_tag character varying(20),
    club_name character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE brawltracker.player OWNER TO app;

--
-- Name: player_id_seq; Type: SEQUENCE; Schema: brawltracker; Owner: app
--

CREATE SEQUENCE brawltracker.player_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE brawltracker.player_id_seq OWNER TO app;

--
-- Name: player_id_seq; Type: SEQUENCE OWNED BY; Schema: brawltracker; Owner: app
--

ALTER SEQUENCE brawltracker.player_id_seq OWNED BY brawltracker.player.id;


--
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: app
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO app;

--
-- Name: listed_players id; Type: DEFAULT; Schema: brawltracker; Owner: app
--

ALTER TABLE ONLY brawltracker.listed_players ALTER COLUMN id SET DEFAULT nextval('brawltracker.listed_players_id_seq'::regclass);


--
-- Name: player id; Type: DEFAULT; Schema: brawltracker; Owner: app
--

ALTER TABLE ONLY brawltracker.player ALTER COLUMN id SET DEFAULT nextval('brawltracker.player_id_seq'::regclass);


--
-- Data for Name: listed_players; Type: TABLE DATA; Schema: brawltracker; Owner: app
--

COPY brawltracker.listed_players (id, tag) FROM stdin;
1	P0QLRUUCQ
2	9PRJJVLGO
3	2P9UQ8JPU
4	2ULLJCJ82
5	99LPY88P8
6	VP0PP2U0
\.


--
-- Data for Name: player; Type: TABLE DATA; Schema: brawltracker; Owner: app
--

COPY brawltracker.player (id, tag, name, trophies, highest_trophies, exp_level, exp_points, total_prestige_level, solo_victories, duo_victories, three_vs_three_victories, best_robo_rumble_time, best_time_as_big_brawler, is_qualified_from_championship_challenge, club_tag, club_name, created_at) FROM stdin;
1	P0QLRUUCQ	MC_Sepli	53954	53956	184	175637	19	1401	1223	6512	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-11 12:20:12.154959
2	9PRJJVLGO	sos dark shadow	56460	56460	192	190254	7	1544	1527	7096	7	0	f	#QVUCLQR0	Hello	2026-03-11 12:22:57.774032
3	2P9UQ8JPU	Survival_008	69859	69866	233	277377	37	1221	3017	10791	6	0	f	\N	\N	2026-03-11 12:23:23.767822
4	2ULLJCJ82	⛩️|Mööse	66909	66909	204	214264	36	1351	1755	9173	7	0	f	#2YPUYP28P	mythic	2026-03-11 12:23:51.202866
5	99LPY88P8	SPIKE	53578	53584	226	262695	17	2215	2592	7011	14	0	f	#RV08G2UV	Сказачная Тайга	2026-03-11 12:24:28.794135
6	VP0PP2U0	猿猟師|DeMoon🤫	49252	49256	185	177141	13	1142	1081	7812	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-11 12:24:50.127215
7	P0QLRUUCQ	MC_Sepli	54060	54060	185	175745	19	1406	1223	6512	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-11 23:00:04.633489
8	9PRJJVLGO	sos dark shadow	56474	56474	192	190269	7	1545	1527	7096	7	0	f	#QVUCLQR0	Hello	2026-03-11 23:00:05.342605
9	2P9UQ8JPU	Survival_008	69907	69909	233	277447	37	1221	3021	10792	6	0	f	\N	\N	2026-03-11 23:00:05.610108
10	2ULLJCJ82	⛩️|Mööse	66967	66970	204	214354	36	1351	1755	9179	7	0	f	#2YPUYP28P	mythic	2026-03-11 23:00:05.860626
11	99LPY88P8	SPIKE	53625	53632	226	262784	17	2215	2598	7011	14	0	f	#RV08G2UV	Сказачная Тайга	2026-03-11 23:00:06.108846
12	VP0PP2U0	猿猟師|DeMoon🤫	49289	49289	185	177212	13	1145	1081	7812	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-11 23:00:06.354247
13	P0QLRUUCQ	MC_Sepli	54144	54144	185	175821	19	1408	1223	6516	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-12 23:00:02.910849
14	9PRJJVLGO	sos dark shadow	56556	56556	192	190387	8	1545	1531	7100	7	0	f	#QVUCLQR0	Hello	2026-03-12 23:00:03.425378
15	2P9UQ8JPU	Survival_008	69865	69909	233	277521	37	1221	3021	10793	6	0	f	\N	\N	2026-03-12 23:00:03.720733
16	2ULLJCJ82	⛩️|Mööse	67080	67084	204	214544	36	1351	1755	9192	7	0	f	#2YPUYP28P	mythic	2026-03-12 23:00:04.007854
17	99LPY88P8	SPIKE	53622	53640	226	262842	17	2215	2598	7012	14	0	f	#RV08G2UV	Сказачная Тайга	2026-03-12 23:00:04.378665
18	VP0PP2U0	猿猟師|DeMoon🤫	49289	49289	185	177212	13	1145	1081	7812	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-12 23:00:04.651631
19	P0QLRUUCQ	MC_Sepli	54176	54176	185	175867	19	1408	1224	6517	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-13 23:00:02.440116
20	9PRJJVLGO	sos dark shadow	56575	56575	192	190417	8	1545	1531	7102	7	0	f	#QVUCLQR0	Hello	2026-03-13 23:00:02.817893
21	2P9UQ8JPU	Survival_008	70034	70034	233	277811	37	1223	3022	10811	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-13 23:00:03.094399
22	2ULLJCJ82	⛩️|Mööse	67116	67121	204	214630	36	1351	1755	9196	7	0	f	#2YPUYP28P	mythic	2026-03-13 23:00:03.372664
23	99LPY88P8	SPIKE	53646	53648	226	262909	17	2215	2598	7015	14	0	f	#RV08G2UV	Сказачная Тайга	2026-03-13 23:00:03.623999
24	VP0PP2U0	猿猟師|DeMoon🤫	49298	49298	185	177221	13	1145	1081	7812	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-13 23:00:03.87447
25	P0QLRUUCQ	MC_Sepli	54323	54331	185	176071	19	1408	1224	6533	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-14 23:00:03.295214
26	9PRJJVLGO	sos dark shadow	56985	56985	192	190822	8	1549	1540	7112	7	0	f	#QVUCLQR0	Hello	2026-03-14 23:00:03.740725
27	2P9UQ8JPU	Survival_008	70035	70045	233	277905	37	1223	3022	10814	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-14 23:00:04.205926
28	2ULLJCJ82	⛩️|Mööse	67383	67383	204	214914	36	1351	1767	9199	7	0	f	#2YPUYP28P	mythic	2026-03-14 23:00:04.489553
29	99LPY88P8	SPIKE	53835	53842	226	263090	17	2216	2606	7015	14	0	f	#RV08G2UV	Сказачная Тайга	2026-03-14 23:00:04.790478
30	VP0PP2U0	猿猟師|DeMoon🤫	49298	49298	185	177221	13	1145	1081	7812	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-14 23:00:05.05197
31	P0QLRUUCQ	MC_Sepli	54342	54342	185	176091	19	1408	1224	6535	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-15 23:00:02.541105
32	9PRJJVLGO	sos dark shadow	57419	57421	193	191230	8	1553	1543	7132	7	0	f	#QVUCLQR0	Hello	2026-03-15 23:00:03.078804
33	2P9UQ8JPU	Survival_008	70035	70045	233	277905	37	1223	3022	10814	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-15 23:00:03.327274
34	2ULLJCJ82	⛩️|Mööse	67409	67418	204	214980	36	1351	1767	9204	7	0	f	#2YPUYP28P	mythic	2026-03-15 23:00:03.767738
35	99LPY88P8	SPIKE	53865	53869	226	263139	17	2218	2607	7015	14	0	f	#RV08G2UV	Сказачная Тайга	2026-03-15 23:00:04.08725
36	VP0PP2U0	猿猟師|DeMoon🤫	49298	49298	185	177221	13	1145	1081	7812	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-15 23:00:04.353886
37	P0QLRUUCQ	MC_Sepli	54421	54421	185	176189	19	1411	1224	6537	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-16 23:00:01.620585
38	9PRJJVLGO	sos dark shadow	57492	57492	193	191326	8	1554	1545	7135	7	0	f	#QVUCLQR0	Hello	2026-03-16 23:00:01.991957
39	2P9UQ8JPU	Survival_008	70092	70092	233	278043	37	1223	3028	10816	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-16 23:00:02.864034
40	2ULLJCJ82	⛩️|Mööse	67415	67418	204	215002	36	1351	1767	9205	7	0	f	#2YPUYP28P	mythic	2026-03-16 23:00:03.22514
41	99LPY88P8	SPIKE	53898	53902	227	263365	17	2218	2614	7019	14	0	f	#2VJUPY0U8	Ndranghetaa	2026-03-16 23:00:03.549917
42	VP0PP2U0	猿猟師|DeMoon🤫	49298	49298	185	177221	13	1145	1081	7812	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-16 23:00:04.132452
43	P0QLRUUCQ	MC_Sepli	54524	54532	185	176380	20	1412	1224	6546	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-17 23:00:02.366284
44	9PRJJVLGO	sos dark shadow	57680	57685	193	191645	9	1555	1547	7148	7	0	f	#QVUCLQR0	Hello	2026-03-17 23:00:02.725565
45	2P9UQ8JPU	Survival_008	70146	70146	233	278131	37	1223	3028	10823	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-17 23:00:03.170619
46	2ULLJCJ82	⛩️|Mööse	67425	67426	204	215024	36	1351	1767	9206	7	0	f	#2YPUYP28P	mythic	2026-03-17 23:00:03.58546
47	99LPY88P8	SPIKE	53943	53962	227	263546	17	2220	2614	7026	14	0	f	#2VJUPY0U8	Ndranghetaa	2026-03-17 23:00:03.954854
48	VP0PP2U0	猿猟師|DeMoon🤫	49298	49298	185	177221	13	1145	1081	7812	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-17 23:00:04.372246
49	P0QLRUUCQ	MC_Sepli	54637	54640	185	176537	20	1413	1224	6554	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-18 23:00:03.106428
50	9PRJJVLGO	sos dark shadow	57798	57801	193	191839	10	1555	1548	7160	7	0	f	#QVUCLQR0	Hello	2026-03-18 23:00:03.560524
51	2P9UQ8JPU	Survival_008	70192	70200	233	278289	37	1223	3029	10830	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-18 23:00:03.8379
52	2ULLJCJ82	⛩️|Mööse	67435	67435	204	215032	36	1351	1767	9207	7	0	f	#2YPUYP28P	mythic	2026-03-18 23:00:04.084505
53	99LPY88P8	SPIKE	54002	54015	227	263790	17	2225	2615	7031	14	0	f	#2VJUPY0U8	Ndranghetaa	2026-03-18 23:00:04.433898
54	VP0PP2U0	猿猟師|DeMoon🤫	49298	49298	185	177221	13	1145	1081	7812	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-18 23:00:04.705331
55	P0QLRUUCQ	MC_Sepli	54637	54640	185	176537	20	1413	1224	6554	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-19 23:00:03.016128
56	9PRJJVLGO	sos dark shadow	57808	57808	193	191847	10	1555	1548	7161	7	0	f	#QVUCLQR0	Hello	2026-03-19 23:00:03.467958
57	2P9UQ8JPU	Survival_008	70325	70331	233	278407	37	1223	3029	10842	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-19 23:00:03.754323
58	2ULLJCJ82	⛩️|Mööse	67498	67498	204	215088	36	1351	1767	9213	7	0	f	#2YPUYP28P	mythic	2026-03-19 23:00:04.169138
59	99LPY88P8	SPIKE	54170	54172	227	264126	17	2225	2617	7048	14	0	f	#2VJUPY0U8	Ndranghetaa	2026-03-19 23:00:04.525582
60	VP0PP2U0	猿猟師|DeMoon🤫	49298	49298	185	177221	13	1145	1081	7812	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-19 23:00:04.806896
61	P0QLRUUCQ	MC_Sepli	54691	54703	185	176693	20	1416	1224	6558	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-20 23:00:02.818831
62	9PRJJVLGO	sos dark shadow	57895	57895	193	192225	10	1555	1548	7189	7	0	f	#QVUCLQR0	Hello	2026-03-20 23:00:03.182752
63	2P9UQ8JPU	Survival_008	70337	70368	233	278576	37	1224	3031	10848	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-20 23:00:03.416768
64	2ULLJCJ82	⛩️|Mööse	67505	67522	204	215146	36	1351	1767	9217	7	0	f	#2YPUYP28P	mythic	2026-03-20 23:00:03.982089
65	99LPY88P8	SPIKE	54218	54218	227	264196	17	2226	2619	7048	14	0	f	#2VJUPY0U8	Ndranghetaa	2026-03-20 23:00:04.221739
66	VP0PP2U0	猿猟師|DeMoon🤫	49322	49327	185	177287	13	1145	1081	7816	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-20 23:00:04.462628
67	P0QLRUUCQ	MC_Sepli	54828	54828	185	176846	20	1417	1224	6570	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-21 23:00:02.499676
68	9PRJJVLGO	sos dark shadow	57902	57902	193	192309	10	1555	1548	7192	7	0	f	#QVUCLQR0	Hello	2026-03-21 23:00:02.816255
69	2P9UQ8JPU	Survival_008	70339	70368	233	278602	37	1224	3031	10849	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-21 23:00:03.124717
70	2ULLJCJ82	⛩️|Mööse	67565	67569	205	215234	36	1351	1767	9224	7	0	f	#2YPUYP28P	mythic	2026-03-21 23:00:03.462249
71	99LPY88P8	SPIKE	54350	54350	227	264322	17	2226	2619	7057	14	0	f	#2VJUPY0U8	Ndranghetaa	2026-03-21 23:00:03.862854
72	VP0PP2U0	猿猟師|DeMoon🤫	49322	49327	185	177287	13	1145	1081	7816	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-21 23:00:04.208033
73	P0QLRUUCQ	MC_Sepli	54901	54904	185	176953	21	1417	1224	6575	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-22 23:00:01.999073
74	9PRJJVLGO	sos dark shadow	57963	57963	193	192456	10	1557	1548	7199	7	0	f	#QVUCLQR0	Hello	2026-03-22 23:00:02.405216
75	2P9UQ8JPU	Survival_008	70339	70368	233	278602	37	1224	3031	10849	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-22 23:00:02.81111
76	2ULLJCJ82	⛩️|Mööse	67574	67575	205	215264	36	1351	1767	9226	7	0	f	#2YPUYP28P	mythic	2026-03-22 23:00:03.112771
77	99LPY88P8	SPIKE	54438	54440	227	264414	17	2226	2619	7064	14	0	f	#2VJUPY0U8	Ndranghetaa	2026-03-22 23:00:03.469109
78	VP0PP2U0	猿猟師|DeMoon🤫	49322	49327	185	177287	13	1145	1081	7816	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-22 23:00:03.725529
79	P0QLRUUCQ	MC_Sepli	55015	55018	185	177120	21	1423	1224	6579	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-23 23:00:02.705696
80	9PRJJVLGO	sos dark shadow	57991	57991	193	192483	10	1558	1548	7199	7	0	f	#QVUCLQR0	Hello	2026-03-23 23:00:03.33053
81	2P9UQ8JPU	Survival_008	70434	70434	233	278782	37	1224	3032	10862	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-23 23:00:03.699056
82	2ULLJCJ82	⛩️|Mööse	67578	67586	205	215316	36	1351	1767	9229	7	0	f	#2YPUYP28P	mythic	2026-03-23 23:00:04.100476
83	99LPY88P8	SPIKE	54600	54600	227	264675	17	2226	2620	7081	14	0	f	#2VJUPY0U8	Ndranghetaa	2026-03-23 23:00:04.361323
84	VP0PP2U0	猿猟師|DeMoon🤫	49322	49327	185	177393	13	1145	1081	7821	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-23 23:00:04.619384
85	P0QLRUUCQ	MC_Sepli	55061	55061	185	177195	21	1424	1225	6580	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-24 23:00:02.72882
86	9PRJJVLGO	sos dark shadow	57985	57991	193	192491	10	1558	1548	7199	7	0	f	#QVUCLQR0	Hello	2026-03-24 23:00:03.090406
87	2P9UQ8JPU	Survival_008	70562	70569	233	279090	37	1224	3032	10881	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-24 23:00:03.338644
88	2ULLJCJ82	⛩️|Mööse	67583	67589	205	215428	36	1351	1768	9236	7	0	f	#2YPUYP28P	mythic	2026-03-24 23:00:03.611039
89	99LPY88P8	SPIKE	54672	54675	227	264851	17	2227	2621	7090	14	0	f	#2VJUPY0U8	Ndranghetaa	2026-03-24 23:00:03.875067
90	VP0PP2U0	猿猟師|DeMoon🤫	49322	49327	185	177393	13	1145	1081	7821	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-24 23:00:04.193162
91	P0QLRUUCQ	MC_Sepli	55124	55126	185	177280	21	1428	1225	6580	5	0	f	#2V2L09GV9	MC_Sepli	2026-03-25 23:00:01.711179
92	9PRJJVLGO	sos dark shadow	58040	58040	193	192647	10	1558	1552	7204	7	0	f	#QVUCLQR0	Hello	2026-03-25 23:00:02.025385
93	2P9UQ8JPU	Survival_008	70641	70647	233	279206	37	1226	3033	10886	6	0	f	#2QJ2902	CharlesBenhamou	2026-03-25 23:00:02.349584
94	2ULLJCJ82	⛩️|Mööse	67737	67745	205	215580	36	1351	1776	9241	7	0	f	#2YPUYP28P	mythic	2026-03-25 23:00:02.755917
95	99LPY88P8	SPIKE	54788	54794	227	265014	17	2230	2622	7097	14	0	f	#2VJUPY0U8	Ndranghetaa	2026-03-25 23:00:03.140269
96	VP0PP2U0	猿猟師|DeMoon🤫	49322	49327	185	177393	13	1145	1081	7821	7	0	f	#2V2L09GV9	MC_Sepli	2026-03-25 23:00:03.521644
\.


--
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: app
--

COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
\.


--
-- Name: listed_players_id_seq; Type: SEQUENCE SET; Schema: brawltracker; Owner: app
--

SELECT pg_catalog.setval('brawltracker.listed_players_id_seq', 6, true);


--
-- Name: player_id_seq; Type: SEQUENCE SET; Schema: brawltracker; Owner: app
--

SELECT pg_catalog.setval('brawltracker.player_id_seq', 96, true);


--
-- Name: listed_players listed_players_pkey; Type: CONSTRAINT; Schema: brawltracker; Owner: app
--

ALTER TABLE ONLY brawltracker.listed_players
    ADD CONSTRAINT listed_players_pkey PRIMARY KEY (id);


--
-- Name: listed_players listed_players_tag_key; Type: CONSTRAINT; Schema: brawltracker; Owner: app
--

ALTER TABLE ONLY brawltracker.listed_players
    ADD CONSTRAINT listed_players_tag_key UNIQUE (tag);


--
-- Name: player player_pkey; Type: CONSTRAINT; Schema: brawltracker; Owner: app
--

ALTER TABLE ONLY brawltracker.player
    ADD CONSTRAINT player_pkey PRIMARY KEY (id);


--
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: app
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: app
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- Name: player player_tag_fkey; Type: FK CONSTRAINT; Schema: brawltracker; Owner: app
--

ALTER TABLE ONLY brawltracker.player
    ADD CONSTRAINT player_tag_fkey FOREIGN KEY (tag) REFERENCES brawltracker.listed_players(tag) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO app;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO app;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO app;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO app;


--
-- PostgreSQL database dump complete
--

\unrestrict S9wicSOTQTHSBT1oVHb03U8iP99GhesIko9VLfcej05LoScziCBBcHs5yxdCdkF

