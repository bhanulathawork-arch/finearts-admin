import React, { useEffect, useMemo, useState } from "react";

import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

import {

  FaHome,

  FaBookOpen,

  FaVideo,

  FaPlayCircle,

  FaCalendarAlt,

  FaFileAlt,

  FaClipboardCheck,

  FaCreditCard,

  FaUser,

  FaSearch,

  FaBell,

  FaArrowRight,

  FaChevronDown,

  FaSignOutAlt,

  FaClock,

  FaUserTie,

  FaSpinner,

  FaBars,

  FaExclamationCircle,

} from "react-icons/fa";

import { auth } from "../../config/firebase";



const WEBSITE_PREVIEW_DASHBOARD_STYLES = `

html, body, #root {

  min-height: 100%;

  margin: 0;

  background: #000000;

}

/* Blue scrollbar for the website LMS dashboard */
html, body, #root,
.finearts-lms,
.finearts-lms * {
  scrollbar-width: thin;
  scrollbar-color: #0879ff #000000;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar,
#root::-webkit-scrollbar,
.finearts-lms::-webkit-scrollbar,
.finearts-lms *::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

html::-webkit-scrollbar-track,
body::-webkit-scrollbar-track,
#root::-webkit-scrollbar-track,
.finearts-lms::-webkit-scrollbar-track,
.finearts-lms *::-webkit-scrollbar-track {
  background: #000000;
}

html::-webkit-scrollbar-thumb,
body::-webkit-scrollbar-thumb,
#root::-webkit-scrollbar-thumb,
.finearts-lms::-webkit-scrollbar-thumb,
.finearts-lms *::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #0879ff 0%, #09b9ff 100%);
  border: 1px solid #000000;
  border-radius: 10px;
}

html::-webkit-scrollbar-thumb:hover,
body::-webkit-scrollbar-thumb:hover,
#root::-webkit-scrollbar-thumb:hover,
.finearts-lms::-webkit-scrollbar-thumb:hover,
.finearts-lms *::-webkit-scrollbar-thumb:hover {
  background: #38d7ff;
}



:root {

  --lms-bg: #000000;

  --lms-sidebar: #000000;

  --lms-card: #061827;

  --lms-card-2: #071b2b;

  --lms-border: rgba(42, 142, 255, 0.2);

  --lms-text: #f7fbff;

  --lms-muted: #b4c4d9;

  --lms-blue: #0879ff;

  --lms-cyan: #09b9ff;

  --lms-purple: #6b20ff;

}



.finearts-lms,

.finearts-lms * {

  box-sizing: border-box;

}



.finearts-lms {

  min-height: 100vh;

  width: 100%;

  display: flex;

  overflow: hidden;

  color: var(--lms-text);

  background: #000000;

  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

}



.finearts-lms button,

.finearts-lms input {

  font: inherit;

}



.lms-sidebar {

  position: fixed;

  top: 80px;

  bottom: 70px;

  left: 0;

  z-index: 80;

  width: 271px;

  height: auto;

  overflow-y: auto;

  overscroll-behavior: contain;

  display: flex;

  flex-direction: column;

  padding: 18px 16px;

  background: #000000;

  border-right: 1px solid #111111;

}

.lms-brand {

  display: flex;

  align-items: center;

  gap: 10px;

  height: 76px;

  padding: 0 9px;

}



.lms-brand-mark {

  width: 39px;

  height: 50px;

  display: flex;

  align-items: center;

  justify-content: center;

  color: #2489ff;

  font-size: 43px;

  line-height: 1;

  text-shadow: 0 0 20px rgba(26, 126, 255, 0.9);

  transform: rotate(-12deg);

}



.lms-brand-name {

  font-size: 31px;

  line-height: 1;

  font-weight: 800;

  letter-spacing: -1.5px;

}



.lms-brand-name span {

  color: #1786ff;

}



.lms-brand-sub {

  margin-top: 5px;

  color: #afbdd0;

  font-size: 14px;

}



.lms-mobile-close,

.lms-menu-button {

  display: none;

}



.lms-content-menu-button {

  margin: 12px 12px 0 auto;

}



.lms-nav {

  margin-top: 17px;

  display: flex;

  flex-direction: column;

  gap: 7px;

}



.lms-nav-item {

  position: relative;

  width: 100%;

  min-height: 50px;

  display: flex;

  align-items: center;

  gap: 19px;

  padding: 0 17px;

  border: 0;

  border-radius: 11px;

  color: #e6edf7;

  background: transparent;

  cursor: pointer;

  text-align: left;

  transition: 0.2s ease;

}



.lms-nav-item svg {

  width: 23px;

  font-size: 22px;

  flex: 0 0 23px;

}



.lms-nav-item span {

  font-size: 16px;

  white-space: nowrap;

}



.lms-nav-item:hover {

  background: rgba(15, 113, 238, 0.12);

}



.lms-nav-item.active {

  color: #fff;

  background: linear-gradient(90deg, #0877ff 0%, #0879ff 55%, #0789ff 100%);

  box-shadow: 0 0 24px rgba(0, 115, 255, 0.62), inset 0 0 12px rgba(255,255,255,0.08);

}



.lms-sidebar-art {

  position: relative;

  flex: 1;

  min-height: 180px;

  margin: 32px -16px -5px;

  padding: 48px 38px 20px;

  overflow: hidden;

  color: #6cb2ff;

  font-family: Georgia, serif;

  font-style: italic;

  font-size: 24px;

  line-height: 1.15;

  background: #000000;

}



.lms-art-line {

  position: relative;

  z-index: 3;

}



.lms-art-glow {

  position: absolute;

  width: 280px;

  height: 120px;

  left: -5px;

  bottom: 8px;

  border-radius: 50%;

  border-top: 3px solid rgba(41, 110, 255, 0.85);

  box-shadow: 0 -22px 70px rgba(34, 87, 255, 0.35);

  transform: rotate(-11deg);

}



.lms-art-glow::after {

  content: "";

  position: absolute;

  width: 110px;

  height: 3px;

  left: 0;

  top: -4px;

  background: linear-gradient(90deg, #096fff, #741cff);

  box-shadow: 0 0 18px #2b6fff;

}



.lms-logout {

  display: flex;

  align-items: center;

  gap: 16px;

  padding: 12px 17px;

  border: 0;

  color: #aebdd0;

  background: transparent;

  cursor: pointer;

  text-align: left;

}



.lms-logout:hover {

  color: #fff;

}



.lms-main {

  width: calc(100% - 271px);

  min-height: 100vh;

  margin-left: 271px;

  background: #000000;

}



.lms-topbar {

  position: sticky;

  top: 0;

  z-index: 50;

  height: 82px;

  display: flex;

  align-items: center;

  gap: 20px;

  padding: 0 26px;

  background: #000000;

  border-bottom: 1px solid #111111;

  backdrop-filter: none;

}



.lms-search-wrap {

  position: relative;

  width: min(515px, 48vw);

  height: 48px;

  display: flex;

  align-items: center;

  gap: 15px;

  padding: 0 18px;

  border: 1px solid rgba(30, 117, 205, 0.25);

  border-radius: 10px;

  background: #000000;

  box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);

}



.lms-search-wrap svg {

  color: #e7f2ff;

  font-size: 19px;

}



.lms-search-wrap input {

  width: 100%;

  border: 0;

  outline: 0;

  color: #eaf2fb;

  background: transparent;

  font-size: 14px;

}



.lms-search-wrap input::placeholder {

  color: #b2bfd1;

}



.lms-search-results {

  position: absolute;

  top: 67px;

  left: 26px;

  width: min(515px, 48vw);

  padding: 8px;

  border: 1px solid rgba(44, 136, 234, 0.28);

  border-radius: 13px;

  background: rgba(3, 19, 32, 0.98);

  box-shadow: 0 22px 60px rgba(0,0,0,.5);

}



.lms-search-results button {

  width: 100%;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 11px 13px;

  border: 0;

  border-radius: 9px;

  color: #fff;

  background: transparent;

  cursor: pointer;

}



.lms-search-results button:hover {

  background: rgba(15, 116, 235, 0.14);

}



.lms-search-results svg {

  color: #2291ff;

}



.lms-no-results {

  padding: 15px;

  color: #8ea1b7;

  font-size: 13px;

}



.lms-topbar-actions {

  margin-left: auto;

  height: 100%;

  display: flex;

  align-items: center;

}



.lms-notification {

  position: relative;

  width: 60px;

  height: 100%;

  display: grid;

  place-items: center;

  color: #edf4fc;

  border: 0;

  border-left: 1px solid rgba(47, 126, 199, 0.2);

  border-right: 1px solid rgba(47, 126, 199, 0.2);

  background: transparent;

  cursor: pointer;

  font-size: 20px;

}



.lms-notification span {

  position: absolute;

  top: 20px;

  right: 12px;

  min-width: 16px;

  height: 16px;

  padding: 0 4px;

  display: grid;

  place-items: center;

  border-radius: 99px;

  color: #fff;

  background: #ff4b5f;

  font-size: 9px;

  font-weight: 800;

}



.lms-user-menu {

  min-width: 242px;

  height: 100%;

  display: flex;

  align-items: center;

  gap: 13px;

  padding: 0 20px;

}



.lms-user-avatar {

  width: 45px;

  height: 45px;

  overflow: hidden;

  flex: 0 0 45px;

  display: grid;

  place-items: center;

  border: 2px solid rgba(255,255,255,0.35);

  border-radius: 50%;

  background: linear-gradient(135deg, #132b49, #0b7cff);

  color: #fff;

  font-weight: 800;

}



.lms-user-avatar img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}



.lms-user-copy {

  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 3px;

}



.lms-user-copy strong {

  font-size: 14px;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

}



.lms-user-copy small {

  color: #b3bfd0;

  font-size: 12px;

}



.lms-user-chevron {

  margin-left: auto;

  color: #e8eff7;

  font-size: 12px;

}



.lms-content {

  width: 100%;

  padding: 14px 23px 45px;

}



.lms-error-banner {

  margin-bottom: 12px;

  display: flex;

  align-items: center;

  gap: 10px;

  padding: 11px 14px;

  border: 1px solid rgba(255, 179, 0, 0.22);

  border-radius: 10px;

  color: #ffc95d;

  background: rgba(255, 179, 0, 0.08);

  font-size: 13px;

}



.lms-dashboard-grid {

  display: grid;

  grid-template-columns: minmax(0, 1fr) 390px;

  gap: 14px;

}



.lms-hero {

  position: relative;

  min-height: 267px;

  overflow: hidden;

  border: 1px solid #111111;

  border-radius: 11px;

  background: #000000;

}



.lms-hero-image {

  position: absolute;

  inset: 0;

  width: 100%;

  height: 100%;

  object-fit: cover;

  object-position: center;

}



.lms-hero-overlay {

  position: absolute;

  inset: 0;

  background: #000000;

}



.lms-hero-content {

  position: relative;

  z-index: 2;

  padding: 34px 26px;

}



.lms-eyebrow {

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 1.7px;

}



.lms-hero h1 {

  margin: 8px 0 7px;

  font-size: clamp(38px, 4vw, 50px);

  line-height: 1;

  letter-spacing: -1.6px;

}



.lms-hero h1 span {

  font-size: 0.72em;

}



.lms-hero p {

  margin: 0;

  color: #f2f5fa;

  font-size: 16px;

  line-height: 1.45;

}



.lms-hero-actions {

  margin-top: 26px;

  display: flex;

  gap: 14px;

}



.lms-primary-button,

.lms-outline-button {

  min-height: 49px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  padding: 0 28px;

  border-radius: 9px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s ease;

}



.lms-primary-button {

  color: #fff;

  border: 1px solid rgba(74, 173, 255, 0.35);

  background: linear-gradient(90deg, #095bff, #0aabff);

  box-shadow: 0 10px 30px rgba(4, 111, 255, 0.27);

}



.lms-primary-button:hover {

  transform: translateY(-1px);

  box-shadow: 0 14px 35px rgba(4, 111, 255, 0.4);

}



.lms-outline-button {

  color: #fff;

  border: 1px solid #167cff;

  background: #000000;

}



.lms-outline-button:hover {

  background: rgba(11, 110, 255, 0.13);

}



.lms-upcoming-panel {

  min-height: 267px;

  padding: 17px 16px;

  border: 1px solid #111111;

  border-radius: 12px;

  background: #000000;

}



.lms-panel-heading,

.lms-section-heading {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

}



.lms-panel-heading h2,

.lms-section-heading h2 {

  margin: 0;

  font-size: 19px;

  letter-spacing: -0.4px;

}



.lms-panel-heading button,

.lms-section-heading button {

  border: 0;

  color: #27a0ff;

  background: transparent;

  cursor: pointer;

  font-size: 13px;

}



.lms-upcoming-row {

  min-height: 65px;

  display: grid;

  grid-template-columns: 70px minmax(0, 1fr) 61px;

  align-items: center;

  gap: 10px;

  margin-top: 12px;

}



.lms-upcoming-image {

  width: 70px;

  height: 58px;

  overflow: hidden;

  display: grid;

  place-items: center;

  border: 1px solid rgba(38, 125, 217, 0.28);

  border-radius: 8px;

  color: #40aaff;

  background: #071c30;

}



.lms-upcoming-image img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}



.lms-upcoming-info {

  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 6px;

}



.lms-upcoming-info strong {

  font-size: 13px;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

}



.lms-upcoming-info span {

  display: flex;

  align-items: center;

  gap: 6px;

  color: #b5c6dc;

  font-size: 11px;

}



.lms-join-btn {

  height: 40px;

  border: 1px solid #137aff;

  border-radius: 8px;

  color: #fff;

  background: linear-gradient(90deg, #0a55f7, #087dff);

  cursor: pointer;

  font-size: 12px;

  font-weight: 700;

}



.lms-join-btn:disabled {

  cursor: not-allowed;

  opacity: 0.5;

}



.lms-panel-loading,

.lms-empty-small {

  min-height: 180px;

  display: grid;

  place-items: center;

  color: #8fa3b9;

  font-size: 12px;

  text-align: center;

}



.lms-feature-grid {

  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 13px;

  margin-top: 13px;

}



.lms-dashboard-icon-card {

  min-height: 101px;

  display: flex;

  align-items: center;

  gap: 17px;

  padding: 16px 18px;

  border: 1px solid rgba(31, 107, 174, 0.2);

  border-radius: 12px;

  color: #fff;

  background: linear-gradient(135deg, rgba(5, 29, 49, 0.97), rgba(4, 20, 34, 0.97));

  cursor: pointer;

  text-align: left;

  transition: 0.2s ease;

}



.lms-dashboard-icon-card:hover {

  transform: translateY(-2px);

  border-color: rgba(29, 125, 255, 0.48);

  box-shadow: 0 12px 30px rgba(0, 71, 145, 0.18);

}



.lms-icon-box {

  width: 59px;

  height: 59px;

  flex: 0 0 59px;

  display: grid;

  place-items: center;

  border-radius: 13px;

  font-size: 25px;

  color: #fff;

}



.lms-icon-box.blue {

  background: linear-gradient(145deg, #075aff, #0d8cff);

  box-shadow: 0 8px 25px rgba(0, 109, 255, 0.35);

}



.lms-icon-box.purple {

  background: linear-gradient(145deg, #4615f5, #7a16ff);

  box-shadow: 0 8px 25px rgba(105, 19, 255, 0.3);

}



.lms-icon-copy {

  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 7px;

}



.lms-icon-copy strong {

  font-size: 15px;

}



.lms-icon-copy small {

  color: #a9bbd2;

  font-size: 12px;

}



.lms-learning-section {

  margin-top: 25px;

}



.lms-section-heading {

  margin-bottom: 12px;

}



.lms-section-heading h2 {

  font-size: 21px;

}



.lms-section-heading button {

  display: inline-flex;

  align-items: center;

  gap: 7px;

  text-decoration: underline;

}



.lms-course-grid {

  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 13px;

}



.lms-course-card {

  overflow: hidden;

  border: 1px solid rgba(31, 110, 182, 0.26);

  border-radius: 12px;

  background: linear-gradient(180deg, #061a2c 0%, #041525 100%);

}



.lms-course-image-wrap {

  position: relative;

  height: 110px;

  overflow: hidden;

}



.lms-course-image {

  width: 100%;

  height: 100%;

  display: block;

  object-fit: cover;

}



.lms-image-fallback {

  display: grid;

  place-items: center;

  color: #39a1ff;

  background: radial-gradient(circle, rgba(20, 111, 255, .25), transparent 55%), #06182a;

  font-size: 34px;

}



.lms-course-badge {

  position: absolute;

  top: 10px;

  right: 10px;

  padding: 5px 9px;

  border-radius: 20px;

  color: #fff;

  background: rgba(0, 24, 49, 0.86);

  border: 1px solid rgba(66, 148, 238, 0.35);

  font-size: 10px;

  font-weight: 800;

}



.lms-course-body {

  padding: 13px 15px 14px;

}



.lms-course-body h3 {

  min-height: 42px;

  margin: 0 0 8px;

  font-size: 16px;

  line-height: 1.3;

}



.lms-course-meta {

  display: flex;

  gap: 12px;

  color: #bdcce0;

  font-size: 11px;

}



.lms-course-meta span,

.lms-course-trainer {

  display: flex;

  align-items: center;

  gap: 6px;

}



.lms-course-meta svg,

.lms-course-trainer svg {

  color: #c6d3e5;

}



.lms-course-trainer {

  margin-top: 9px;

  color: #aebfd5;

  font-size: 11px;

}



.lms-course-body button {

  width: 100%;

  min-height: 38px;

  margin-top: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  border: 1px solid #1681ff;

  border-radius: 8px;

  color: #0b98ff;

  background: transparent;

  cursor: pointer;

  font-weight: 700;

  font-size: 12px;

}



.lms-course-body button:hover {

  color: #fff;

  background: #0879ff;

}



.lms-learning-loading,

.lms-empty-learning {

  min-height: 180px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 16px;

  padding: 25px;

  border: 1px dashed rgba(45, 129, 214, 0.24);

  border-radius: 13px;

  color: #91a5ba;

  text-align: center;

}



.lms-empty-learning {

  justify-content: flex-start;

  text-align: left;

}



.lms-empty-icon {

  width: 58px;

  height: 58px;

  flex: 0 0 58px;

  display: grid;

  place-items: center;

  border-radius: 13px;

  color: #20a0ff;

  background: rgba(15, 113, 255, 0.12);

  font-size: 25px;

}



.lms-empty-learning h3 {

  margin: 0 0 5px;

  color: #fff;

  font-size: 16px;

}



.lms-empty-learning p {

  margin: 0;

  color: #91a5ba;

  font-size: 12px;

}



.lms-empty-learning .lms-primary-button {

  margin-left: auto;

  min-height: 42px;

  padding: 0 18px;

  white-space: nowrap;

}



.lms-loading-screen {

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-direction: column;

  gap: 13px;

  color: #dfeeff;

  background: #000000;

}



.lms-spinner {

  color: #1887ff;

  animation: lms-spin 0.8s linear infinite;

}



.lms-loading-screen .lms-spinner {

  font-size: 28px;

}



@keyframes lms-spin {

  to { transform: rotate(360deg); }

}



.lms-sidebar-overlay {

  display: none;

}



@media (max-width: 1250px) {

  .lms-dashboard-grid {

    grid-template-columns: minmax(0, 1fr) 340px;

  }



  .lms-feature-grid,

  .lms-course-grid {

    grid-template-columns: repeat(2, minmax(0, 1fr));

  }

}



@media (max-width: 1000px) {

  .lms-sidebar {

    transform: translateX(-102%);

    transition: transform 0.25s ease;

  }



  .lms-sidebar.open {

    transform: translateX(0);

  }



  .lms-sidebar-overlay {

    position: fixed;

    inset: 0;

    z-index: 70;

    display: block;

    border: 0;

    background: rgba(0,0,0,.6);

    backdrop-filter: blur(3px);

  }



  .lms-mobile-close,

  .lms-menu-button {

    display: grid;

    place-items: center;

    border: 0;

    color: #fff;

    background: transparent;

    cursor: pointer;

  }



  .lms-mobile-close {

    margin-left: auto;

    font-size: 18px;

  }



  .lms-menu-button {

    width: 42px;

    height: 42px;

    flex: 0 0 42px;

    border-radius: 9px;

    background: rgba(16, 120, 255, .12);

  }



  .lms-main {

    width: 100%;

    margin-left: 0;

  }



  .lms-dashboard-grid {

    grid-template-columns: 1fr;

  }



  .lms-upcoming-panel {

    min-height: auto;

  }

}



@media (max-width: 720px) {

  .lms-topbar {

    height: 70px;

    padding: 0 12px;

    gap: 10px;

  }



  .lms-search-wrap {

    width: auto;

    flex: 1;

    height: 44px;

  }



  .lms-topbar-actions {

    margin-left: 0;

  }



  .lms-notification {

    width: 40px;

    border: 0;

  }



  .lms-user-copy,

  .lms-user-chevron {

    display: none;

  }



  .lms-user-menu {

    min-width: auto;

    padding: 0;

  }



  .lms-user-avatar {

    width: 38px;

    height: 38px;

    flex-basis: 38px;

  }



  .lms-content {

    padding: 10px 10px 30px;

  }



  .lms-hero {

    min-height: 340px;

  }



  .lms-hero-content {

    padding: 30px 20px;

  }



  .lms-hero h1 {

    font-size: 37px;

  }



  .lms-hero p {

    font-size: 14px;

  }



  .lms-hero p br {

    display: none;

  }



  .lms-hero-actions {

    flex-direction: column;

    align-items: stretch;

  }



  .lms-hero-quote {

    display: none;

  }



  .lms-feature-grid,

  .lms-course-grid {

    grid-template-columns: 1fr;

  }



  .lms-upcoming-row {

    grid-template-columns: 58px minmax(0, 1fr) 58px;

  }



  .lms-upcoming-image {

    width: 58px;

    height: 53px;

  }



  .lms-empty-learning {

    flex-direction: column;

    align-items: flex-start;

  }



  .lms-empty-learning .lms-primary-button {

    margin-left: 0;

  }

}



`;



const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://finearts-backend.onrender.com/api";



const LMS_BASE = "/institute/website/preview/lms";



const getStoredStudent = () => {

  try {

    const raw = localStorage.getItem("studentUser");

    return raw ? JSON.parse(raw) : null;

  } catch {

    return null;

  }

};



const getStoredToken = () =>

  localStorage.getItem("studentToken") || null;



const getStoredInstituteId = () => {

  const keys = [

    "currentInstituteId",

    "current_institute_id",

    "institute_id",

    "websiteInstituteId",

    "website_institute_id",

    "selectedInstituteId",

    "selected_institute_id",

    "previewInstituteId",

  ];



  for (const key of keys) {

    const value = Number(localStorage.getItem(key));

    if (Number.isInteger(value) && value > 0) return value;

  }



  try {

    const stored = JSON.parse(localStorage.getItem("institute") || "null");

    const value = Number(

      stored?.institute?.id ||

        stored?.institute_id ||

        stored?.instituteId ||

        stored?.id

    );

    if (Number.isInteger(value) && value > 0) return value;

  } catch {

    // ignore malformed local storage

  }



  return null;

};



const responseData = (payload) => payload?.data ?? payload ?? {};



const asArray = (value) => (Array.isArray(value) ? value : []);



const firstValue = (...values) =>

  values.find(

    (value) =>

      value !== undefined &&

      value !== null &&

      String(value).trim() !== ""

  );



const imageOf = (item) =>

  firstValue(

    item?.image,

    item?.image_url,

    item?.banner_image,

    item?.banner_url,

    item?.cover_image,

    item?.thumbnail,

    item?.thumbnail_url,

    item?.class_image,

    item?.profile_image,

    item?.photoURL,

    item?.logo

  ) || "";



const nameOf = (student) =>

  firstValue(

    student?.name,

    student?.full_name,

    student?.displayName,

    student?.student?.name,

    student?.student?.full_name,

    student?.user?.full_name,

    "Student"

  );



const avatarOf = (student) =>

  firstValue(

    student?.profile_image,

    student?.student_photo,

    student?.photoURL,

    student?.student?.profile_image,

    student?.user?.profile_image

  ) || "";



const classIdOf = (item) =>

  Number(

    item?.class_id ||

      item?.classId ||

      item?.id ||

      item?.class?.id

  );



const formatDate = (value) => {

  if (!value) return "Date not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-IN", {

    weekday: "short",

    day: "2-digit",

    month: "short",

  });

};



const formatTime = (value) => {

  if (!value) return "Time not available";

  const raw = String(value);

  const date = new Date(raw);



  if (raw.includes("T") && !Number.isNaN(date.getTime())) {

    return date.toLocaleTimeString("en-IN", {

      hour: "2-digit",

      minute: "2-digit",

    });

  }



  const match = raw.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);

  if (!match) return raw;



  let hour = Number(match[1]);

  const minute = match[2];

  const suffix = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${hour}:${minute} ${suffix}`;

};



const normalizeBookings = (payload) => {

  const data = responseData(payload);

  return asArray(

    Array.isArray(data)

      ? data

      : data?.bookings || data?.data?.bookings || data?.data

  );

};



const normalizeSessions = (payload) => {

  const data = responseData(payload);

  return asArray(

    data?.sessions ||

      data?.data?.sessions ||

      (Array.isArray(data) ? data : [])

  );

};



const normalizeWebsite = (payload) => {

  const data = responseData(payload);

  return {

    ...data,

    institute: data?.institute || {},

    website: data?.website || {},

    branding: data?.branding || {},

    banners: asArray(data?.banners),

    classes: asArray(data?.classes || data?.courses),

    courses: asArray(data?.courses || data?.classes),

  };

};



const getHomeBanner = (website) => {

  const banners = asArray(website?.banners);

  const home = banners.find((banner) => {

    const type = String(

      banner?.banner_type || banner?.bannerType || banner?.type || ""

    ).toUpperCase();

    return type === "HOME" || type === "HERO";

  });

  return home || banners[0] || null;

};



const isPaidConfirmed = (booking) =>

  String(booking?.status || "").toUpperCase() === "CONFIRMED" &&

  String(booking?.payment_status || "").toUpperCase() === "PAID";



const dedupeClassesFromBookings = (bookings) => {

  const map = new Map();



  bookings.forEach((booking) => {

    if (!isPaidConfirmed(booking)) return;

    const id = classIdOf(booking);

    if (!Number.isInteger(id) || id <= 0) return;

    if (!map.has(id)) map.set(id, booking);

  });



  return Array.from(map.values());

};



const getProgress = (booking) => {

  const candidates = [

    booking?.progress,

    booking?.progress_percentage,

    booking?.completion_percentage,

    booking?.class_progress,

  ];



  const value = candidates.find(

    (item) => item !== undefined && item !== null && item !== ""

  );



  if (value === undefined) return null;

  const number = Number(value);

  if (!Number.isFinite(number)) return null;

  return Math.min(100, Math.max(0, Math.round(number)));

};



const fetchJson = async (url, token = null) => {

  const headers = { Accept: "application/json" };

  if (token) headers.Authorization = `Bearer ${token}`;



  const response = await fetch(url, { headers });

  const payload = await response.json().catch(() => ({}));



  if (!response.ok) {

    const error = new Error(

      payload?.message || payload?.error || `Request failed (${response.status})`

    );

    error.status = response.status;

    throw error;

  }



  return payload;

};



const getToken = async () => {

  const stored = getStoredToken();

  if (stored) return stored;



  if (auth.currentUser) {

    const token = await auth.currentUser.getIdToken();

    localStorage.setItem("studentToken", token);

    return token;

  }



  return null;

};



const navItems = [

  { label: "Dashboard", path: `${LMS_BASE}/dashboard`, icon: FaHome },

  { label: "My Learning", path: `${LMS_BASE}/my-learning`, icon: FaBookOpen },

  { label: "Live Sessions", path: `${LMS_BASE}/live-sessions`, icon: FaVideo },

  { label: "Recordings", path: `${LMS_BASE}/recordings`, icon: FaPlayCircle },

  { label: "Assignments", path: `${LMS_BASE}/assignments`, icon: FaFileAlt },

  { label: "Attendance", path: `${LMS_BASE}/attendance`, icon: FaClipboardCheck },

  { label: "Payment Details", path: `${LMS_BASE}/payment-details`, icon: FaCreditCard },

  { label: "Profile", path: `${LMS_BASE}/profile`, icon: FaUser },

];





const CourseCard = ({ booking, websiteClass, onContinue }) => {

  const title =

    firstValue(

      booking?.class_title,

      websiteClass?.title,

      websiteClass?.name,

      "Untitled Class"

    );

  const image = imageOf(booking) || imageOf(websiteClass);

  const level = firstValue(

    booking?.class_level,

    websiteClass?.level,

    "—"

  );

  const duration = firstValue(

    booking?.class_duration,

    websiteClass?.duration

  );

  const trainer = firstValue(

    booking?.trainer_name,

    websiteClass?.trainer_name,

    websiteClass?.trainer?.name,

    "—"

  );

  const progress = getProgress(booking);



  return (

    <article className="lms-course-card">

      <div className="lms-course-image-wrap">

        {image ? (

          <img src={image} alt={title} className="lms-course-image" />

        ) : (

          <div className="lms-course-image lms-image-fallback">

            <FaBookOpen />

          </div>

        )}

        <span className="lms-course-badge">

          {progress !== null ? `${progress}%` : "Enrolled"}

        </span>

      </div>



      <div className="lms-course-body">

        <h3>{title}</h3>



        <div className="lms-course-meta">

          <span>

            <FaCalendarAlt />

            {duration ? `${duration} ${Number(duration) === 1 ? "Day" : "Days"}` : "Class"}

          </span>

          <span>

            <FaUserTie />

            {level}

          </span>

        </div>



        {trainer && (

          <div className="lms-course-trainer">

            <FaUserTie />

            <span>{trainer}</span>

          </div>

        )}



        <button type="button" onClick={() => onContinue(booking)}>

          {progress !== null && progress > 0 ? "Continue" : "View Course"}

          <FaArrowRight />

        </button>

      </div>

    </article>

  );

};



const UpcomingCard = ({ session, onJoin }) => {

  const title = firstValue(

    session?.session_title,

    session?.title,

    session?.class_title,

    "Live Session"

  );

  const image = imageOf(session);

  const date = firstValue(

    session?.local_date,

    session?.session_date,

    session?.date,

    session?.start_time

  );

  const time = firstValue(

    session?.local_start_time,

    session?.start_time,

    session?.session_start_time

  );

  const joinUrl = firstValue(

    session?.join_url,

    session?.zoom_link,

    session?.meeting_url

  );



  return (

    <div className="lms-upcoming-row">

      <div className="lms-upcoming-image">

        {image ? (

          <img src={image} alt={title} />

        ) : (

          <FaVideo />

        )}

      </div>

      <div className="lms-upcoming-info">

        <strong>{title}</strong>

        <span>

          <FaCalendarAlt /> {formatDate(date)} · {formatTime(time)}

        </span>

      </div>

      <button

        type="button"

        className="lms-join-btn"

        disabled={!joinUrl}

        onClick={() => joinUrl && onJoin(joinUrl)}

      >

        Join

      </button>

    </div>

  );

};



const WebsitePreviewDashboard = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const context = useOutletContext() || {};



  const [website, setWebsite] = useState(() => ({

    institute: context?.institute || {},

    website: context?.website || {},

    branding: context?.branding || {},

    banners: context?.banners || [],

    classes: context?.classes || context?.courses || [],

    courses: context?.courses || context?.classes || [],

  }));

  const [student, setStudent] = useState(

    context?.studentUser || getStoredStudent()

  );

  const [bookings, setBookings] = useState([]);

  const [upcoming, setUpcoming] = useState([]);

  const [loading, setLoading] = useState(true);

  const [personalLoading, setPersonalLoading] = useState(true);

  const [error, setError] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");



  const instituteId = useMemo(() => {

    const candidates = [

      context?.instituteId,

      context?.institute_id,

      context?.institute?.id,

      context?.website?.institute_id,

      context?.website?.instituteId,

      context?.websiteData?.institute?.id,

      student?.institute_id,

      student?.instituteId,

      getStoredInstituteId(),

      new URLSearchParams(location.search).get("institute_id"),

    ];



    for (const value of candidates) {

      const id = Number(value);

      if (Number.isInteger(id) && id > 0) return id;

    }

    return null;

  }, [context, student, location.search]);



  const loadWebsite = async () => {

    if (!instituteId) {

      setError("Institute ID is missing. Open the Website Preview from the institute panel.");

      setLoading(false);

      return;

    }



    try {

      setLoading(true);

      const payload = await fetchJson(

        `${API}/websites/public/${instituteId}?preview=true`

      );

      setWebsite(normalizeWebsite(payload));

      setError("");

    } catch (err) {

      console.error("WEBSITE LMS PUBLIC DATA ERROR:", err);

      setError(err.message || "Unable to load institute website data.");

    } finally {

      setLoading(false);

    }

  };



  const loadStudentData = async () => {

    try {

      setPersonalLoading(true);

      const token = await getToken();

      if (!token) {

        setBookings([]);

        setUpcoming([]);

        return;

      }



      /* Refresh the real student profile when the parent outlet

         has not already supplied it. */

      if (!student && instituteId) {

        try {

          const profilePayload = await fetchJson(

            `${API}/students/me?institute_id=${encodeURIComponent(instituteId)}`,

            token

          );

          const profile = responseData(profilePayload);

          const nextStudent =

            profile?.student ||

            profile?.user ||

            profile?.account ||

            profile;

          if (nextStudent && typeof nextStudent === "object") {

            setStudent(nextStudent);

            localStorage.setItem("studentUser", JSON.stringify(nextStudent));

          }

        } catch (profileError) {

          console.warn("LMS STUDENT PROFILE REFRESH:", profileError);

        }

      }



      const [bookingPayload, sessionPayload] = await Promise.all([

        fetchJson(`${API}/bookings/my`, token),

        fetchJson(`${API}/sessions/user/upcoming?days=7`, token),

      ]);



      const bookingList = normalizeBookings(bookingPayload);

      const allUpcoming = normalizeSessions(sessionPayload);

      const enrolledIds = new Set(

        bookingList

          .filter(isPaidConfirmed)

          .map(classIdOf)

          .filter((id) => Number.isInteger(id) && id > 0)

      );



      const studentUpcoming = allUpcoming.filter((session) =>

        enrolledIds.has(classIdOf(session))

      );



      setBookings(bookingList);

      setUpcoming(studentUpcoming);

    } catch (err) {

      console.error("WEBSITE LMS PERSONAL DATA ERROR:", err);

      setBookings([]);

      setUpcoming([]);

    } finally {

      setPersonalLoading(false);

    }

  };



  useEffect(() => {

    if (context?.studentUser) setStudent(context.studentUser);

  }, [context?.studentUser]);



  useEffect(() => {

    loadWebsite();

  }, [instituteId]);



  useEffect(() => {

    loadStudentData();

  }, [student]);



  const displayName = nameOf(student);

  const firstName = displayName.split(" ")[0] || "Student";

  const avatar = avatarOf(student);

  const heroBanner = getHomeBanner(website);

  const heroImage = imageOf(heroBanner);



  const websiteClasses = website.classes || [];

  const enrolledBookings = dedupeClassesFromBookings(bookings);



  const classLookup = useMemo(() => {

    const map = new Map();

    websiteClasses.forEach((item) => {

      const id = classIdOf(item);

      if (Number.isInteger(id) && id > 0) map.set(id, item);

    });

    return map;

  }, [websiteClasses]);



  const learning = enrolledBookings

    .map((booking) => ({

      booking,

      websiteClass: classLookup.get(classIdOf(booking)) || null,

    }))

    .filter(({ booking, websiteClass }) => booking || websiteClass)

    .slice(0, 4);



  const upcomingVisible = upcoming.slice(0, 3);



  const searchMatches = useMemo(() => {

    const q = search.trim().toLowerCase();

    if (!q) return [];

    return websiteClasses

      .filter((item) =>

        [item?.title, item?.name, item?.description, item?.level]

          .filter(Boolean)

          .join(" ")

          .toLowerCase()

          .includes(q)

      )

      .slice(0, 6);

  }, [search, websiteClasses]);



  const go = (path) => {

    setSidebarOpen(false);

    navigate(path);

  };



  const openJoin = (url) => {

    window.open(url, "\_blank", "noopener,noreferrer");

  };



  const continueLearning = (booking) => {

    const id = classIdOf(booking);

    if (id) {

      navigate(`${LMS_BASE}/my-learning/course/${id}`);

    } else {

      navigate(`${LMS_BASE}/my-learning`);

    }

  };



  const handleLogout = async () => {

    try {

      await auth.signOut();

    } catch (err) {

      console.error("LMS LOGOUT ERROR:", err);

    }



    [

      "studentUser",

      "studentToken",

      "studentRole",

      "studentLoggedIn",

    ].forEach((key) => localStorage.removeItem(key));



    navigate("/institute/website/preview/login", { replace: true });

  };



  if (loading) {

    return (

      <div className="lms-loading-screen">

        <FaSpinner className="lms-spinner" />

        <span>Loading your dashboard...</span>

      </div>

    );

  }



  const branding = website.branding || {};

  const primary =

    branding?.primaryColor || branding?.primary_color || "#0879ff";

  const instituteName =

    firstValue(website?.institute?.name, "FineArts");



  return (

    <div className="finearts-lms" style={{ "--lms-primary": primary }}>

      <style>{WEBSITE_PREVIEW_DASHBOARD_STYLES}</style>

      <aside className={`lms-sidebar ${sidebarOpen ? "open" : ""}`}>



        <nav className="lms-nav">

          {navItems.map((item) => {

            const Icon = item.icon;

            const active = location.pathname === item.path;

            return (

              <button

                key={item.path}

                type="button"

                className={`lms-nav-item ${active ? "active" : ""}`}

                onClick={() => go(item.path)}

              >

                <Icon />

                <span>{item.label}</span>

              </button>

            );

          })}

        </nav>



        <button className="lms-logout" type="button" onClick={handleLogout}>

          <FaSignOutAlt />

          <span>Logout</span>

        </button>

      </aside>



      {sidebarOpen && (

        <button

          type="button"

          className="lms-sidebar-overlay"

          onClick={() => setSidebarOpen(false)}

          aria-label="Close menu"

        />

      )}



      <main className="lms-main">

        <button

          className="lms-menu-button lms-content-menu-button"

          type="button"

          onClick={() => setSidebarOpen(true)}

          aria-label="Open navigation menu"

        >

          <FaBars />

        </button>



        <section className="lms-content">

          {error && (

            <div className="lms-error-banner">

              <FaExclamationCircle />

              <span>{error}</span>

            </div>

          )}



          <div className="lms-dashboard-grid">

            <section className="lms-hero">

              <div className="lms-hero-content">

                <span className="lms-eyebrow">WELCOME BACK,</span>

                <h1>

                  {firstName} <span>👋</span>

                </h1>

                <p>

                  Keep learning, keep creating. Every session

                  <br />

                  brings you closer to your goals.

                </p>

                <div className="lms-hero-actions">

                  <button

                    type="button"

                    className="lms-primary-button"

                    onClick={() => go(`${LMS_BASE}/my-learning`)}

                  >

                    Continue Learning <FaArrowRight />

                  </button>

                  <button

                    type="button"

                    className="lms-outline-button"

                    onClick={() => navigate("/institute/website/preview/classes")}

                  >

                    Explore Courses

                  </button>

                </div>

              </div>

            </section>



            <section className="lms-upcoming-panel">

              <div className="lms-panel-heading">

                <h2>Upcoming Live Sessions</h2>

                <button type="button" onClick={() => go(`${LMS_BASE}/live-sessions`)}>

                  View All

                </button>

              </div>



              {personalLoading ? (

                <div className="lms-panel-loading">

                  <FaSpinner className="lms-spinner" />

                </div>

              ) : upcomingVisible.length ? (

                upcomingVisible.map((session) => (

                  <UpcomingCard

                    key={session?.session_id || session?.id}

                    session={session}

                    onJoin={openJoin}

                  />

                ))

              ) : (

                <div className="lms-empty-small">

                  No upcoming sessions for your booked classes.

                </div>

              )}

            </section>

          </div>



          <section className="lms-learning-section">

            <div className="lms-section-heading">

              <h2>My Learning</h2>

              <button type="button" onClick={() => go(`${LMS_BASE}/my-learning`)}>

                View All Courses <FaArrowRight />

              </button>

            </div>



            {personalLoading ? (

              <div className="lms-learning-loading">

                <FaSpinner className="lms-spinner" />

                <span>Loading your enrolled courses...</span>

              </div>

            ) : learning.length ? (

              <div className="lms-course-grid">

                {learning.map(({ booking, websiteClass }) => (

                  <CourseCard

                    key={booking?.id || booking?.booking_id || classIdOf(booking)}

                    booking={booking}

                    websiteClass={websiteClass}

                    onContinue={continueLearning}

                  />

                ))}

              </div>

            ) : (

              <div className="lms-empty-learning">

                <div className="lms-empty-icon">

                  <FaBookOpen />

                </div>

                <div>

                  <h3>No enrolled courses yet</h3>

                  <p>

                    {instituteName} has published classes available for you to explore.

                  </p>

                </div>

                <button

                  type="button"

                  className="lms-primary-button"

                  onClick={() => navigate("/institute/website/preview/classes")}

                >

                  Explore Courses <FaArrowRight />

                </button>

              </div>

            )}

          </section>

        </section>

      </main>

    </div>

  );

};



export default WebsitePreviewDashboard;
