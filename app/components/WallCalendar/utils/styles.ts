export const baseStyle = `
  .cal-root {
    font-family: 'Georgia', 'Times New Roman', serif;
    box-sizing: border-box;
  }
  .cal-root *,
  .cal-root *::before,
  .cal-root *::after {
    box-sizing: inherit;
  }
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .slide-left {
    animation: slideInLeft 0.22s ease forwards;
  }
  .slide-right {
    animation: slideInRight 0.22s ease forwards;
  }
  .fade-up {
    animation: fadeUp 0.3s ease forwards;
  }
  .day-cell {
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .day-cell:hover .day-num:not(.is-start):not(.is-end) {
    transform: scale(1.15);
  }
  .notes-area {
    transition: all 0.3s ease;
  }
  .punch-hole {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.18);
    border: 2px solid rgba(255, 255, 255, 0.3);
    flex-shrink: 0;
  }
  .tab-btn {
    cursor: pointer;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 0.04em;
    transition: all 0.15s;
    border: 1px solid;
    font-family: 'Georgia', serif;
  }
`;
