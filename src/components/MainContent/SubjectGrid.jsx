import React from 'react';
import SubjectCard  from './SubjectCard';
// Constants for reusable colors
const SUBJECT_COLORS = {
  ORANGE: '#FF6B00',
  BLUE: '#0088CC',
  GREEN: '#8CC63F',
  RED: '#E74C3C'
};

const SUBJECTS = [
  { 
    subject: 'PHYSICS',
    imageUrl: '/assets/physics1.png',
    backgroundColor: SUBJECT_COLORS.ORANGE,
    path: '/physics'
  },
  { 
    subject: 'CHEMISTRY',
    imageUrl: '/assets/chemistry1.png',
    backgroundColor: SUBJECT_COLORS.BLUE,
    path: '/chemistry'
  },
  { 
    subject: 'BIOLOGY',
    imageUrl: '/assets/biology1.png',
    backgroundColor: SUBJECT_COLORS.GREEN,
    path: '/biology'
  },
  { 
    subject: 'MATHS',
    imageUrl: '/assets/maths1.png',
    backgroundColor: SUBJECT_COLORS.RED,
    path: '/maths'
  },
  { 
    subject: 'LANGUAGE',
    imageUrl: '/assets/Language-Icon2.png',
    backgroundColor: SUBJECT_COLORS.ORANGE,
    path: '/language'
  },
  { 
    subject: 'SCIENCE',
    imageUrl: '/assets/Science_img.png',
    backgroundColor: SUBJECT_COLORS.BLUE,
    path: '/science'
  },
  { 
    subject: 'SOCIAL SCIENCE',
    imageUrl: '/assets/Social-Science-Icon1.png',
    backgroundColor: SUBJECT_COLORS.GREEN,
    path: '/social-science'
  },
  { 
    subject: 'COMPUTER',
    imageUrl: '/assets/Compter_Science_img.png',
    backgroundColor: SUBJECT_COLORS.RED,
    path: '/computer'
  },
  { 
    subject: '3D/AR/VR',
    imageUrl: '/assets/MicrosoftTeams-image_3Darvr.png',
    backgroundColor: SUBJECT_COLORS.ORANGE,
    path: '/3d-ar-vr'
  },
  { 
    subject: 'EDP',
    imageUrl: '/assets/1729489858_icon.png',
    backgroundColor: SUBJECT_COLORS.BLUE,
    path: '/edp'
  },
  { 
    subject: 'ISL',
    imageUrl: '/assets/1729489858_icon.png',
    backgroundColor: SUBJECT_COLORS.GREEN,
    path: '/isl'
  },
  { 
    subject: 'SKILL DEVELOPMENT',
    imageUrl: '/assets/skillDev.jpg',
    backgroundColor: SUBJECT_COLORS.RED,
    path: '/SkillsPage'
  }
];

const SubjectGrid = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {SUBJECTS.map((data) => (
        <SubjectCard
          key={data.subject}
          {...data}
        />
      ))}
    </div>
  </div>
);

export default SubjectGrid;