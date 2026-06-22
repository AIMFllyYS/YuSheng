"use client";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export function CalendarView() {
  return (
    <div className="w-full h-full pt-24 px-4 md:px-12 text-white overflow-y-auto no-scrollbar relative z-10">
      <div className="max-w-5xl mx-auto glass-card p-4 md:p-6 mb-20" style={{
        '--fc-border-color': 'rgba(255,255,255,0.1)',
        '--fc-button-bg-color': 'rgba(255,255,255,0.1)',
        '--fc-button-border-color': 'rgba(255,255,255,0.2)',
        '--fc-button-hover-bg-color': 'var(--accent-main)',
        '--fc-button-hover-border-color': 'var(--accent-main)',
        '--fc-page-bg-color': 'transparent',
        '--fc-today-bg-color': 'rgba(255,255,255,0.05)',
      } as any}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          events={[
            { title: '完成项目规划与架构确认', date: new Date().toISOString().split('T')[0], color: '#22c55e' },
            { title: '前端重构 (Phase 1 & 2)', start: new Date().toISOString().split('T')[0], end: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], color: '#f472b6' }
          ]}
          height="700px"
        />
      </div>
    </div>
  );
}
