"use client";

import { useCallback, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type GradePoint = {
  grade: string;
  points: number;
};

type Course = {
  id: string;
  name: string;
  credits: number;
  grade: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const GRADE_MAP: GradePoint[] = [
  { grade: "A+", points: 4.0 },
  { grade: "A",  points: 4.0 },
  { grade: "A-", points: 3.7 },
  { grade: "B+", points: 3.3 },
  { grade: "B",  points: 3.0 },
  { grade: "B-", points: 2.7 },
  { grade: "C+", points: 2.3 },
  { grade: "C",  points: 2.0 },
  { grade: "C-", points: 1.7 },
  { grade: "D+", points: 1.3 },
  { grade: "D",  points: 1.0 },
  { grade: "F",  points: 0.0 },
];

const CREDIT_OPTIONS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6];

const GPA_BANDS = [
  { min: 3.7, label: "优秀 Summa Cum Laude", color: "#10B981" },
  { min: 3.3, label: "良好 Magna Cum Laude",  color: "#F59E0B" },
  { min: 3.0, label: "不错 Cum Laude",         color: "#60A5FA" },
  { min: 2.0, label: "合格 Satisfactory",       color: "#9CA3AF" },
  { min: 0,   label: "不合栀Unsatisfactory",   color: "#EF4444" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function gradeToPoints(grade: string): number {
  return GRADE_MAP.find((g) => g.grade === grade)?.points ?? 0;
}

function calcGPA(courses: Course[]): { gpa: number; totalCredits: number } {
  const valid = courses.filter((c) => c.grade !== "");
  if (valid.length === 0) return { gpa: 0, totalCredits: 0 };
  const totalCredits = valid.reduce((s, c) => s + c.credits, 0);
  const weightedSum = valid.reduce(
    (s, c) => s + gradeToPoints(c.grade) * c.credits,
    0
  );
  return {
    gpa: totalCredits > 0 ? weightedSum / totalCredits : 0,
    totalCredits,
  };
}

function getBand(gpa: number) {
  return (
    GPA_BANDS.find((b) => gpa >= b.min) ?? GPA_BANDS[GPA_BANDS.length - 1]
  );
}

function newCourse(): Course {
  return {
    id: crypto.randomUUID(),
    name: "",
    credits: 3,
    grade: "",
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GpaGauge({ gpa }: { gpa: number }) {
  const band = getBand(gpa);
  const pct = Math.min((gpa / 4.0) * 100, 100);
  const circumference = 2 * Math.PI * 52;
  const dash = (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full -rotate-90"
          aria-label={`GPA gauge showing ${gpa.toFixed(2)}`}
        >
          {/* track */}
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="10"
          />
          {/* progress */}
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke={band.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference - dash}`}
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-mono font-black"
            style={{ color: band.color, textShadow: `0 0 20px ${band.color}40` }}
          >
            {gpa.toFixed(2)}
          </span>
          <span className="text-[10px] text-gray-400 tracking-widest uppercase">GPA</span>
        </div>
      </div>
      <span
        className="text-xs font-semibold tracking-wide px-3 py-1 rounded-full border"
        style={{
          color: band.color,
          borderColor: `${band.color}50`,
          background: `${band.color}15`,
        }}
      >
        {band.label}
      </span>
    </div>
  );
}

function CourseRow({
  course,
  index,
  onChange,
  onRemove,
  isOnly,
}: {
  course: Course;
  index: number;
  onChange: (id: string, field: keyof Course, value: string | number) => void;
  onRemove: (id: string) => void;
  isOnly: boolean;
}) {
  return (
    <div
      className="grid gap-2 items-center"
      style={{ gridTemplateColumns: "2fr 90px 90px 36px" }}
    >
      {/* Course name */}
      <input
        id={`course-name-${index}`}
        type="text"
        value={course.name}
        placeholder={`课程 ${index + 1}`}
        onChange={(e) => onChange(course.id, "name", e.target.value)}
        className="gpa-input text-sm"
        aria-label={`课程 ${index + 1} 名称`}
      />

      {/* Credits */}
      <select
        id={`course-credits-${index}`}
        value={course.credits}
        onChange={(e) => onChange(course.id, "credits", Number(e.target.value))}
        className="gpa-input text-sm text-center"
        aria-label={`课程 ${index + 1} 学分`}
      >
        {CREDIT_OPTIONS.map((c) => (
          <option key={c} value={c}>{c} 学分</option>
        ))}
      </select>

      {/* Grade */}
      <select
        id={`course-grade-${index}`}
        value={course.grade}
        onChange={(e) => onChange(course.id, "grade", e.target.value)}
        className="gpa-input text-sm text-center font-mono"
        aria-label={`课程 ${index + 1} 成绩`}
      >
        <option value="">成绩</option>
        {GRADE_MAP.map((g) => (
          <option key={g.grade} value={g.grade}>
            {g.grade} ({g.points.toFixed(1)})
          </option>
        ))}
      </select>

      {/* Remove */}
      <button
        type="button"
        id={`remove-course-${index}`}
        onClick={() => onRemove(course.id)}
        disabled={isOnly}
        className="w-9 h-9 rounded flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        aria-label={`移除课程 ${index + 1}`}
      >
        <i className="fas fa-times text-xs" />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MyGPA() {
  const [courses, setCourses] = useState<Course[]>([newCourse(), newCourse(), newCourse()]);
  const [semesterLabel, setSemesterLabel] = useState("2024 025 第一学期");

  const { gpa, totalCredits } = calcGPA(courses);
  const completedCount = courses.filter((c) => c.grade !== "").length;

  const addCourse = useCallback(() => {
    setCourses((prev) => [...prev, newCourse()]);
  }, []);

  const removeCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCourse = useCallback(
    (id: string, field: keyof Course, value: string | number) => {
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
      );
    },
    []
  );

  const reset = useCallback(() => {
    setCourses([newCourse(), newCourse(), newCourse()]);
  }, []);

  return (
    <div className="gpa-root flex flex-col h-full overflow-hidden">
      <style>{`
        .gpa-root {
          --gpa-bg: #0f1117;
          --gpa-surface: #181b24;
          --gpa-border: rgba(255,255,255,0.08);
          --gpa-accent: #F59E0B;
          --gpa-text: #e5e7eb;
          --gpa-muted: #6b7280;
          font-family: 'Inter', 'DM Sans', system-ui, sans-serif;
          background: var(--gpa-bg);
          color: var(--gpa-text);
        }
        .gpa-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--gpa-border);
          border-radius: 6px;
          padding: 7px 10px;
          color: var(--gpa-text);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .gpa-input:focus {
          border-color: var(--gpa-accent);
          box-shadow: 0 0 0 2px rgba(245,158,11,0.15);
        }
        .gpa-input option { background: #1e2130; }
        .gpa-btn-primary {
          background: var(--gpa-accent);
          color: #000;
          border: none;
          border-radius: 6px;
          padding: 8px 18px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
        }
        .gpa-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .gpa-btn-ghost {
          background: transparent;
          border: 1px solid var(--gpa-border);
          color: var(--gpa-muted);
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 13px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .gpa-btn-ghost:hover { border-color: rgba(255,255,255,0.2); color: var(--gpa-text); }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--gpa-border);
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-label { font-size: 10px; color: var(--gpa-muted); letter-spacing: 0.08em; text-transform: uppercase; }
        .stat-value { font-size: 22px; font-weight: 800; font-family: 'JetBrains Mono', 'Fira Code', monospace; color: var(--gpa-accent); }
        .section-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gpa-muted);
          border-bottom: 1px solid var(--gpa-border);
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .grade-band-bar { height: 3px; border-radius: 2px; background: linear-gradient(90deg,#EF4444 0%,#F59E0B 40%,#10B981 100%); margin: 4px 0; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "var(--gpa-border)", background: "var(--gpa-surface)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center text-black font-black"
            style={{ background: "var(--gpa-accent)" }}
          >
            <i className="fas fa-graduation-cap text-sm" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wide" style={{ color: "var(--gpa-text)" }}>
              MyGPA 计算噀            </h1>
            <input
              id="semester-label"
              type="text"
              value={semesterLabel}
              onChange={(e) => setSemesterLabel(e.target.value)}
              className="text-[11px] bg-transparent border-none outline-none w-48"
              style={{ color: "var(--gpa-muted)" }}
              aria-label="学期标签"
            />
          </div>
        </div>
        <button
          type="button"
          id="gpa-reset-btn"
          onClick={reset}
          className="gpa-btn-ghost text-xs flex items-center gap-1"
        >
          <i className="fas fa-refresh" /> 重置
        </button>
      </div>

      {/* Body: two-panel */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT: Course list */}
        <div className="flex-1 flex flex-col overflow-hidden p-5 gap-4">
          <div>
            <div className="section-title">课程列表</div>
            {/* Column headers */}
            <div
              className="grid gap-2 mb-2 text-[10px] font-semibold tracking-widest uppercase"
              style={{
                gridTemplateColumns: "2fr 90px 90px 36px",
                color: "var(--gpa-muted)",
              }}
            >
              <span className="px-2">课程名称</span>
              <span className="text-center">学分</span>
              <span className="text-center">成绩</span>
              <span />
            </div>
          </div>

          {/* Scrollable rows */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-2 no-scrollbar pr-1">
            {courses.map((course, i) => (
              <CourseRow
                key={course.id}
                course={course}
                index={i}
                onChange={updateCourse}
                onRemove={removeCourse}
                isOnly={courses.length === 1}
              />
            ))}
          </div>

          {/* Add course */}
          <button
            type="button"
            id="add-course-btn"
            onClick={addCourse}
            className="gpa-btn-ghost flex items-center justify-center gap-2 w-full"
          >
            <i className="fas fa-plus text-xs" />
            添加课程
          </button>
        </div>

        {/* RIGHT: Dashboard */}
        <div
          className="w-56 flex flex-col gap-4 p-5 border-l"
          style={{ borderColor: "var(--gpa-border)", background: "var(--gpa-surface)" }}
        >
          <div className="section-title">实时结果</div>

          {/* GPA Gauge */}
          <div className="flex flex-col items-center py-2">
            <GpaGauge gpa={gpa} />
          </div>

          {/* Stat cards */}
          <div className="flex flex-col gap-2">
            <div className="stat-card">
              <span className="stat-label">总学刀</span>
              <span className="stat-value">{totalCredits.toFixed(1)}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">已填课程</span>
              <span className="stat-value" style={{ fontSize: "18px" }}>
                {completedCount} / {courses.length}
              </span>
            </div>
          </div>

          {/* Grade reference */}
          <div>
            <div className="section-title mt-2">绩点对照</div>
            <div className="grade-band-bar" />
            <div className="flex flex-col gap-1 mt-2">
              {GRADE_MAP.slice(0, 6).map((g) => (
                <div key={g.grade} className="flex justify-between text-[11px]">
                  <span className="font-mono font-bold" style={{ color: "var(--gpa-accent)" }}>
                    {g.grade}
                  </span>
                  <span style={{ color: "var(--gpa-muted)" }}>{g.points.toFixed(1)}</span>
                </div>
              ))}
              <div className="text-[10px] text-center mt-1" style={{ color: "var(--gpa-muted)" }}>
                · · ·
              </div>
              {GRADE_MAP.slice(6).map((g) => (
                <div key={g.grade} className="flex justify-between text-[11px]">
                  <span className="font-mono font-bold" style={{ color: "var(--gpa-muted)" }}>
                    {g.grade}
                  </span>
                  <span style={{ color: "var(--gpa-muted)" }}>{g.points.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
