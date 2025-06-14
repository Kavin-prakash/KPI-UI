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
// import React from 'react';
// import { Box, Typography, Chip } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
// import EventIcon from '@mui/icons-material/Event';
// import ScheduleIcon from '@mui/icons-material/Schedule';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import SavingsIcon from '@mui/icons-material/Savings';
// import StarIcon from '@mui/icons-material/Star';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import PieChartIcon from '@mui/icons-material/PieChart';
// import BarChartIcon from '@mui/icons-material/BarChart';

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
// }

// const iconSx = { fontSize: 22, mr: 2 };

// const iconPool = [
//   <AccountCircleIcon sx={iconSx} />,
//   <BusinessCenterIcon sx={iconSx} />,
//   <EventIcon sx={iconSx} />,
//   <ScheduleIcon sx={iconSx} />,
//   <AttachMoneyIcon sx={iconSx} />,
//   <SavingsIcon sx={iconSx} />,
//   <StarIcon sx={iconSx} />,
//   <TrendingUpIcon sx={iconSx} />,
//   <PieChartIcon sx={iconSx} />,
//   <BarChartIcon sx={iconSx} />
// ];

// const colorPalette = [
//   '#E3F2FD', // Light Blue
//   '#E8F5E8', // Light Green
//   '#FFF3E0', // Light Orange
//   '#F3E5F5', // Light Purple
//   '#E0F2F1', // Light Teal
//   '#FCE4EC', // Light Pink
//   '#F5F5F5', // Light Gray
//   '#FFEBEE', // Light Red
//   '#FFFDE7', // Light Yellow
//   '#E1F5FE', // Light Cyan
//   '#F9FBE7', // Light Lime
//   '#ECEFF1'  // Light Blue Gray
// ];
// const borderPalette = [
//   '#2196F3', // Blue
//   '#4CAF50', // Green
//   '#FF9800', // Orange
//   '#9C27B0', // Purple
//   '#009688', // Teal
//   '#E91E63', // Pink
//   '#757575', // Gray
//   '#F44336', // Red
//   '#FBC02D', // Yellow
//   '#00BCD4', // Cyan
//   '#CDDC39', // Lime
//   '#607D8B'  // Blue Gray
// ];
// function getColorIndex(key: string) {
//   let hash = 0;
//   for (let i = 0; i < key.length; i++) {
//     hash = ((hash << 5) - hash) + key.charCodeAt(i);
//     hash |= 0;
//   }
//   return Math.abs(hash) % colorPalette.length;
// }
// const getKPIColor = (key: string): string => colorPalette[getColorIndex(key)];
// const getKPIBorderColor = (key: string): string => borderPalette[getColorIndex(key)];
// const getKPIIcon = (key: string): React.ReactElement => {
//   const idx = getColorIndex(key) % iconPool.length;
//   return iconPool[idx];
// };

// const KPIPanel: React.FC<KPIPanelProps> = ({ extractedKPIs, selectedKPI, handleKpiClick }) => (
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
//             icon={getKPIIcon(kpi.label + kpi.value)}
//             onClick={() => handleKpiClick(kpi)}
//             sx={{
//               justifyContent: 'flex-start',
//               height: 'auto',
//               minHeight: '40px',
//               padding: '8px 16px',
//               borderRadius: '20px',
//               transition: 'all 0.3s ease',
//               backgroundColor: selectedKPI?.id === kpi.id ? getKPIBorderColor(kpi.label + kpi.value) : getKPIColor(kpi.label + kpi.value),
//               color: selectedKPI?.id === kpi.id ? 'white' : '#333',
//               border: `2px solid ${getKPIBorderColor(kpi.label + kpi.value)}`,
//               cursor: 'pointer',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//               '&:hover': {
//                 transform: 'translateY(-2px)',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                 backgroundColor: getKPIBorderColor(kpi.label + kpi.value),
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
import React, { useState } from 'react';
import { Box, Typography, Chip, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from '@mui/material';
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
import CancelIcon from '@mui/icons-material/Cancel';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

interface KPI {
  id: string;
  label: string;
  value: string;
  pageNumber: number;
  position: { x: number; y: number };
  box: { x: number; y: number; width: number; height: number };
  icon?: string;
  rejected?: boolean;
  rejectionReason?: string;
}

interface KPIPanelProps {
  extractedKPIs: KPI[];
  selectedKPI: KPI | null;
  handleKpiClick: (kpi: KPI) => void;
  onFeedback?: (kpiId: string, rejected: boolean, reason?: string) => void;
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

export function getColorIndex(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % colorPalette.length;
}

export const getKPIColor = (key: string): string => colorPalette[getColorIndex(key)];
export const getKPIBorderColor = (key: string): string => borderPalette[getColorIndex(key)];

const iconMap: Record<string, React.ReactElement> = {
  AccountCircle: <AccountCircleIcon sx={iconSx} />,
  BusinessCenter: <BusinessCenterIcon sx={iconSx} />,
  Event: <EventIcon sx={iconSx} />,
  Schedule: <ScheduleIcon sx={iconSx} />,
  AttachMoney: <AttachMoneyIcon sx={iconSx} />,
  Savings: <SavingsIcon sx={iconSx} />,
  Star: <StarIcon sx={iconSx} />,
  TrendingUp: <TrendingUpIcon sx={iconSx} />,
  PieChart: <PieChartIcon sx={iconSx} />,
  BarChart: <BarChartIcon sx={iconSx} />
};

function getKPIIcon(kpi: KPI): React.ReactElement {
  if (kpi.icon && iconMap[kpi.icon]) {
    return iconMap[kpi.icon];
  }
  const idx = getColorIndex(kpi.label + kpi.value) % iconPool.length;
  return iconPool[idx];
}

const KPIPanel: React.FC<KPIPanelProps> = ({ extractedKPIs, selectedKPI, handleKpiClick, onFeedback }) => {
  const [kpis, setKpis] = useState<KPI[]>(extractedKPIs);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedKpiForReject, setSelectedKpiForReject] = useState<KPI | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModelMessage, setShowModelMessage] = useState(false);

  const handleRejectClick = (kpi: KPI) => {
    setSelectedKpiForReject(kpi);
    setRejectionReason('');
    setRejectDialogOpen(true);
    setShowModelMessage(false);
  };

  const handleRejectConfirm = async () => {
    if (selectedKpiForReject) {
      setIsSubmitting(true);
      setShowModelMessage(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setKpis(prevKpis =>
        prevKpis.map(kpi =>
          kpi.id === selectedKpiForReject.id
            ? { ...kpi, rejected: true, rejectionReason }
            : kpi
        )
      );
      onFeedback?.(selectedKpiForReject.id, true, rejectionReason);

      // Close dialog after a delay to show the message
      setTimeout(() => {
        setRejectDialogOpen(false);
        setSelectedKpiForReject(null);
        setRejectionReason('');
        setIsSubmitting(false);
        setShowModelMessage(false);
      }, 1500);
    }
  };

  const handleRejectCancel = () => {
    setRejectDialogOpen(false);
    setSelectedKpiForReject(null);
    setRejectionReason('');
    setShowModelMessage(false);
  };

  return (
    <>
      <Box sx={{
        width: '350px',
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
            Extractions
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
          {kpis.map((kpi) => (
            <Box key={kpi.id} sx={{ mb: 1, position: 'relative' }}>
              <Chip
                label={<span>{kpi.label}: {kpi.value}</span>}
                icon={getKPIIcon(kpi)}
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
                  opacity: kpi.rejected ? 0.5 : 1,
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
              <Box sx={{
                position: 'absolute',
                right: -8,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                gap: 0.5,
                bgcolor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '2px',
              }}>
                {kpi.rejected && kpi.rejectionReason && (
                  <Tooltip
                    title={
                      <Box sx={{ p: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          Rejection Reason:
                        </Typography>
                        <Typography variant="body2">
                          {kpi.rejectionReason}
                        </Typography>
                      </Box>
                    }
                    arrow
                    placement="left"
                  >
                    <IconButton
                      size="small"
                      sx={{
                        color: '#d32f2f',
                        opacity: 0.8,
                        '&:hover': { opacity: 1 },
                        p: 0.5
                      }}
                    >
                      <ChatBubbleIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                {!kpi.rejected && (
                  <Tooltip title="Reject extraction">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRejectClick(kpi);
                      }}
                      sx={{
                        color: '#757575',
                        '&:hover': { color: '#F44336' },
                        p: 0.5
                      }}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Rejection Dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={handleRejectCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{
          bgcolor: '#fff3f3',
          borderBottom: '1px solid #ffcdd2',
          color: '#d32f2f'
        }}>
          Reject Extraction
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedKpiForReject && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                KPI Details:
              </Typography>
              <Box sx={{
                bgcolor: '#f5f5f5',
                p: 2,
                borderRadius: 1,
                mb: 2
              }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Label:</strong> {selectedKpiForReject.label}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Value:</strong> {selectedKpiForReject.value}
                </Typography>
                <Typography variant="body1">
                  <strong>Page:</strong> {selectedKpiForReject.pageNumber}
                </Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Reason for Rejection:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Please provide a reason for rejecting this extraction..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
                disabled={isSubmitting}
              />
              {showModelMessage && (
                <Box sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: '#fff3f3',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  border: '1px solid #ffcdd2'
                }}>
                  <CircularProgress size={20} sx={{ color: '#d32f2f' }} />
                  <Typography variant="body2" sx={{ color: '#d32f2f', fontStyle: 'italic' }}>
                    My bad — I'll try harder next time. 🧠 Heading back to training camp...
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#fafafa' }}>
          <Button
            onClick={handleRejectCancel}
            disabled={isSubmitting}
            sx={{
              color: '#666',
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRejectConfirm}
            variant="contained"
            color="error"
            disabled={!rejectionReason.trim() || isSubmitting}
            sx={{
              bgcolor: '#d32f2f',
              '&:hover': { bgcolor: '#b71c1c' }
            }}
          >
            {isSubmitting ? 'Sending...' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default KPIPanel;
