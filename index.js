// At the top of your app.js
if (!window.ReactIcons) {
    console.error("React Icons failed to load!");
    // Provide fallback icons
    window.ReactIcons = {
      Md: {
        MdOutlineExpandLess: () => <span>▲</span>,
        MdOutlineExpandMore: () => <span>▼</span>
      }
    };
  }

// Access Material-UI components from global MUI object
const {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Slider,
    Button,
    IconButton,
    DialogActions,
    Dialog,
    DialogContent,
    useMediaQuery,
  } = MaterialUI;
  
  // Access icons from global ReactIcons.Md object
  // Proper way to access icons through window object
  // SAFEST APPROACH - Use direct path to icons
const MdOutlineExpandLess = window.ReactIcons?.Md?.MdOutlineExpandLess || 
(() => <span>▲</span>); // Fallback
const MdOutlineExpandMore = window.ReactIcons?.Md?.MdOutlineExpandMore || 
(() => <span>▼</span>); // Fallback

// ALTERNATIVE - Use different icon import method
// Add this script tag to HTML:
// <script src="https://unpkg.com/@mui/icons-material@5.11.16/umd/material-icons.min.js"></script>
// Then use:
// const { ExpandLess as MdOutlineExpandLess, ExpandMore as MdOutlineExpandMore } = window.MaterialUI.Icons;
  
  // Main component
  const EmiVsRentCalculator = () => {
    const [cost_of_house, setCostOfHouse] = React.useState(1);
    const [showAssumptions, setShowAssumptions] = React.useState(false);
    const [loan_tenure, setLoanTenure] = React.useState(20);
    const [down_payment, setDownPayment] = React.useState(30);
    const [loan_rate, setLoanRatePerYear] = React.useState(9.5);
    const [Monthly_emi, setMonthlyEmi] = React.useState("65,249");
    const [totalCumulativeInterest, setTotalCumulativeInterest] = React.useState("86,59,804");
    const [total_principal, settotal_principal] = React.useState("70,00,000");
    const [loan_to_value, setLoanRatio] = React.useState(70);
    const [openModal, setOpenModal] = React.useState(false);
  
    const isDesktop = useMediaQuery("(min-width:1200px)");
  
    // Handler functions
    const toggleAssumptions = () => setShowAssumptions((prev) => !prev);
    const handleSliderChange = (setter) => (event, newValue) => setter(newValue);
    
    const handleDownPaymentChange = (event, newValue) => {
      setDownPayment(newValue);
      setLoanRatio(100 - newValue);
    };
  
    const handleLoanRatioChange = (event, newValue) => {
      setLoanRatio(newValue);
      setDownPayment(100 - newValue);
    };
  
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
  
    // Simplified calculation function
    const handlEmiVsRentApi = () => {
      // Placeholder calculation - replace with your actual logic
      setMonthlyEmi("65,249");
      setTotalCumulativeInterest("86,59,804");
      settotal_principal("70,00,000");
    };
  
    return (
      <>
        <Container className="calculator-container">
          <h2 className="calculator-subhead">Everything you need to know about home ownership with Pre-home.</h2>
          
          {isDesktop ? (
            <Grid container spacing={4} sx={{ padding: "0px" }}>
              {/* Left side with inputs */}
              <Grid item xs={12} md={5}>
                <Box className="Emi-calc-box">
                  <Typography variant="h4" className="calculator-title">
                    EMI Calculator
                  </Typography>
                  <Typography variant="body1" className="calculator-description">
                    Our EMI calculator instantly shows your monthly installments,
                    total interest payable, and principal breakdown.
                  </Typography>
                </Box>
  
                <Typography gutterBottom className="slider-label">
                  <b>Cost Of House Today</b>
                </Typography>
                <Box className="slider-container">
                  <Slider
                    value={cost_of_house}
                    onChange={handleSliderChange(setCostOfHouse)}
                    min={1}
                    max={3}
                    step={0.25}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => `${value} Cr`}
                    className="custom-slider"
                  />
                  <div className="slider-labels">
                    <span>1 Cr</span>
                    <span>3 Cr</span>
                  </div>
                </Box>
              </Grid>
  
              {/* Right side with results */}
              <Grid item xs={12} md={7}>
                <Box className="results-container">
                  <div className="result-item">
                    <Typography variant="subtitle1" className="result-label">
                      Monthly EMI
                    </Typography>
                    <Typography variant="h6" className="result-value">
                      INR {Monthly_emi}
                    </Typography>
                  </div>
                  <div className="result-item">
                    <Typography variant="subtitle1" className="result-label">
                      Total Interest
                    </Typography>
                    <Typography variant="h6" className="result-value">
                      INR {totalCumulativeInterest}
                    </Typography>
                  </div>
                  <div className="result-item">
                    <Typography variant="subtitle1" className="result-label">
                      Total Principal
                    </Typography>
                    <Typography variant="h6" className="result-value">
                      INR {total_principal}
                    </Typography>
                  </div>
                </Box>
              </Grid>
            </Grid>
          ) : (
            /* Mobile view would go here */
            <div>Mobile view content</div>
          )}
        </Container>
      </>
    );
  };
  
  // Render the app
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<EmiVsRentCalculator />);