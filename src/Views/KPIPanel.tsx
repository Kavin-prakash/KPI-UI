// import React from 'react';
// import { Box, Typography, Chip } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
// import EventIcon from '@mui/icons-material/Event';
// import ScheduleIcon from '@mui/icons-material/Schedule';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import SavingsIcon from '@mui/icons-material/Savings';

// interface KPI {
//   id: string;
//   label: string;
//   value: string;
//   pageNumber: number;
//   position: { x: number; y: number };
//   box: { x: number; y: number; width: number; height: number };
// }

// interface KPIPanelProps {
//   extractedKPIs: KPI[];
//   selectedKPI: KPI | null;
//   handleKpiClick: (kpi: KPI) => void;
//   getKPIColor: (kpiText: string) => string;
//   getKPIBorderColor: (kpiText: string) => string;
// }

// const iconSx = { fontSize: 22, mr: 2 };

// const getKPIIcon = (label: string): React.ReactElement => {
//   if (label.includes('LP Name')) return <AccountCircleIcon sx={iconSx} />;
//   if (label.includes('Fund Name')) return <BusinessCenterIcon sx={iconSx} />;
//   if (label.includes('Capital Call Date')) return <EventIcon sx={iconSx} />;
//   if (label.includes('Due Date')) return <ScheduleIcon sx={iconSx} />;
//   if (label.includes('Called Amount')) return <AttachMoneyIcon sx={iconSx} />;
//   if (label.includes('Committed Capital')) return <SavingsIcon sx={iconSx} />;
//   return <span />;
// };

// const KPIPanel: React.FC<KPIPanelProps> = ({ extractedKPIs, selectedKPI, handleKpiClick, getKPIColor, getKPIBorderColor }) => (
//   <Box sx={{
//     width: '320px',
//     display: 'flex',
//     flexDirection: 'column',
//     bgcolor: '#fafafa',
//     borderLeft: '1px solid #e0e0e0',
//     overflow: 'hidden'
//   }}>
//     <Box sx={{
//       p: 2,
//       borderBottom: '1px solid #e0e0e0',
//       bgcolor: 'white'
//     }}>
//       <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 1 }}>
//         Capital Call Details
//       </Typography>
//       <Typography variant="caption" color="text.secondary">
//         Click on a metric to highlight it in the document
//       </Typography>
//     </Box>
//     <Box sx={{
//       flex: 1,
//       overflow: 'auto',
//       p: 2,
//       '&::-webkit-scrollbar': {
//         width: '6px',
//       },
//       '&::-webkit-scrollbar-track': {
//         background: '#f1f1f1',
//         borderRadius: '3px',
//       },
//       '&::-webkit-scrollbar-thumb': {
//         background: '#c1c1c1',
//         borderRadius: '3px',
//         '&:hover': {
//           background: '#a8a8a8',
//         },
//       },
//     }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
//         {extractedKPIs.map((kpi) => (
//           <Chip
//             key={kpi.id}
//             label={<span>&nbsp;{kpi.label}: {kpi.value}</span>}
//             icon={getKPIIcon(kpi.label)}
//             onClick={() => handleKpiClick(kpi)}
//             sx={{
//               justifyContent: 'flex-start',
//               height: 'auto',
//               minHeight: '40px',
//               padding: '8px 16px',
//               borderRadius: '20px',
//               transition: 'all 0.3s ease',
//               backgroundColor: selectedKPI?.id === kpi.id ? getKPIBorderColor(`${kpi.label}: ${kpi.value}`) : getKPIColor(`${kpi.label}: ${kpi.value}`),
//               color: selectedKPI?.id === kpi.id ? 'white' : '#333',
//               border: `2px solid ${getKPIBorderColor(`${kpi.label}: ${kpi.value}`)}`,
//               cursor: 'pointer',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//               '&:hover': {
//                 transform: 'translateY(-2px)',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                 backgroundColor: getKPIBorderColor(`${kpi.label}: ${kpi.value}`),
//                 color: 'white',
//                 scale: '1.02',
//               },
//               '& .MuiChip-label': {
//                 whiteSpace: 'normal',
//                 wordBreak: 'break-word',
//                 textAlign: 'left',
//                 width: '100%',
//                 fontSize: '0.875rem',
//                 fontWeight: 600,
//                 lineHeight: 1.4,
//                 padding: '0 0 0 4px',
//               },
//             }}
//           />
//         ))}
//       </Box>
//     </Box>
//   </Box>
// );

// export default KPIPanel;
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SavingsIcon from '@mui/icons-material/Savings';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';

interface KPI {
  id: string;
  label: string;
  value: string;
  pageNumber: number;
  position: { x: number; y: number };
  box: { x: number; y: number; width: number; height: number };
}

interface KPIPanelProps {
  extractedKPIs: KPI[];
  selectedKPI: KPI | null;
  handleKpiClick: (kpi: KPI) => void;
}

const iconSx = { fontSize: 22, mr: 2 };

const iconPool = [
  <AccountCircleIcon sx={iconSx} />,
  <BusinessCenterIcon sx={iconSx} />,
  <EventIcon sx={iconSx} />,
  <ScheduleIcon sx={iconSx} />,
  <AttachMoneyIcon sx={iconSx} />,
  <SavingsIcon sx={iconSx} />,
  <StarIcon sx={iconSx} />,
  <TrendingUpIcon sx={iconSx} />,
  <PieChartIcon sx={iconSx} />,
  <BarChartIcon sx={iconSx} />
];

const colorPalette = [
  '#E3F2FD', // Light Blue
  '#E8F5E8', // Light Green
  '#FFF3E0', // Light Orange
  '#F3E5F5', // Light Purple
  '#E0F2F1', // Light Teal
  '#FCE4EC', // Light Pink
  '#F5F5F5', // Light Gray
  '#FFEBEE', // Light Red
  '#FFFDE7', // Light Yellow
  '#E1F5FE', // Light Cyan
  '#F9FBE7', // Light Lime
  '#ECEFF1'  // Light Blue Gray
];
const borderPalette = [
  '#2196F3', // Blue
  '#4CAF50', // Green
  '#FF9800', // Orange
  '#9C27B0', // Purple
  '#009688', // Teal
  '#E91E63', // Pink
  '#757575', // Gray
  '#F44336', // Red
  '#FBC02D', // Yellow
  '#00BCD4', // Cyan
  '#CDDC39', // Lime
  '#607D8B'  // Blue Gray
];
function getColorIndex(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % colorPalette.length;
}
const getKPIColor = (key: string): string => colorPalette[getColorIndex(key)];
const getKPIBorderColor = (key: string): string => borderPalette[getColorIndex(key)];
const getKPIIcon = (key: string): React.ReactElement => {
  const idx = getColorIndex(key) % iconPool.length;
  return iconPool[idx];
};

const KPIPanel: React.FC<KPIPanelProps> = ({ extractedKPIs, selectedKPI, handleKpiClick }) => (
  <Box sx={{
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: '#fafafa',
    borderLeft: '1px solid #e0e0e0',
    overflow: 'hidden'
  }}>
    <Box sx={{
      p: 2,
      borderBottom: '1px solid #e0e0e0',
      bgcolor: 'white'
    }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 1 }}>
        Capital Call Details
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Click on a metric to highlight it in the document
      </Typography>
    </Box>
    <Box sx={{
      flex: 1,
      overflow: 'auto',
      p: 2,
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#c1c1c1',
        borderRadius: '3px',
        '&:hover': {
          background: '#a8a8a8',
        },
      },
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {extractedKPIs.map((kpi) => (
          <Chip
            key={kpi.id}
            label={<span>&nbsp;{kpi.label}: {kpi.value}</span>}
            icon={getKPIIcon(kpi.label + kpi.value)}
            onClick={() => handleKpiClick(kpi)}
            sx={{
              justifyContent: 'flex-start',
              height: 'auto',
              minHeight: '40px',
              padding: '8px 16px',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              backgroundColor: selectedKPI?.id === kpi.id ? getKPIBorderColor(kpi.label + kpi.value) : getKPIColor(kpi.label + kpi.value),
              color: selectedKPI?.id === kpi.id ? 'white' : '#333',
              border: `2px solid ${getKPIBorderColor(kpi.label + kpi.value)}`,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                backgroundColor: getKPIBorderColor(kpi.label + kpi.value),
                color: 'white',
                scale: '1.02',
              },
              '& .MuiChip-label': {
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                textAlign: 'left',
                width: '100%',
                fontSize: '0.875rem',
                fontWeight: 600,
                lineHeight: 1.4,
                padding: '0 0 0 4px',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  </Box>
);

export default KPIPanel;
