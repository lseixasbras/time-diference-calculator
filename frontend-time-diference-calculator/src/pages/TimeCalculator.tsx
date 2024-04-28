import { Button, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { LocationComparison, LocationDTO } from "../types";
import { calculateTimeDiference, getLocation } from "../services/client";

const columns: GridColDef<LocationDTO>[] = [
  { field: "geonameId", headerName: "ID", width: 90 },
  {
    field: "toponymName",
    headerName: "Loc. Name",
    width: 200,
    editable: false,
  },
  {
    field: "countryName",
    headerName: "Country name",
    width: 200,
    editable: false,
  },
  {
    field: "lng",
    headerName: "Lng",
    width: 100,
    editable: false,
  },
  {
    field: "lat",
    headerName: "Lat",
    width: 100,
    editable: false,
  },
];

const resultColumns: GridColDef<LocationComparison>[] = [
  { field: "comparisonLocationName", headerName: "Loc. Name", width: 200 },
  {
    field: "comparisonLocationTimeZone",
    headerName: "Loc. Time Zone",
    width: 200,
    editable: false,
  },
  {
    field: "referenceLocationName",
    headerName: "Reference name",
    width: 200,
    editable: false,
  },
  {
    field: "referenceLocationNameTimeZone",
    headerName: "Reference Time Zone",
    width: 200,
    editable: false,
  },
  {
    field: "timeDifference",
    headerName: "Reference is 'X' hours against Location",
    width: 300,
    editable: false,
  },
];

const TimeCalculator = () => {
  const [timeCalculationResult, setTimeCalculationResult] = useState<
    LocationComparison[]
  >([]);
  const [searchLocations, setSearchLocations] = useState<LocationDTO[]>([]);
  const [searchReferenceLocation, setSearchReferenceLocation] = useState<
    LocationDTO[]
  >([]);
  const [inputSearchLocation, setInputSearchLocation] = useState("");
  const [inputReferenceSearchLocation, setInputReferenceSearchLocation] =
    useState("");
  const [compareLocations, setCompareLocations] = useState<LocationDTO[]>([]);
  const [compareReferenceLocation, setCompareReferenceLocation] =
    useState<LocationDTO>();

  const handleCompareLocations = (id: number) => {
    const location = searchLocations.find(
      (location) => location.geonameId === id
    );
    if (location) {
      setCompareLocations((prevLocations) => [...prevLocations, location]);
    }
  };

  const handleCompareReferenceLocation = (id: number) => {
    const location = searchReferenceLocation.find(
      (location) => location.geonameId === id
    );
    if (location) {
      setCompareReferenceLocation(location);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchLocation(event.target.value);
  };

  const handleInputChangeReferenceLocation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferenceSearchLocation(event.target.value);
  };

  const fetchSearchLocation = () => {
    getLocation(inputSearchLocation)
      .then((res) => {
        setSearchLocations(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const calculateTimeZone = () => {
    if (!compareReferenceLocation || !compareLocations.length) return;
    calculateTimeDiference(compareLocations, compareReferenceLocation)
      .then((res) => {
        setTimeCalculationResult(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const fetchReferenceSearchLocation = () => {
    getLocation(inputReferenceSearchLocation)
      .then((res) => {
        setSearchReferenceLocation(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }} textAlign={"center"} mt="50px">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Grid container mb="10px">
            <Grid item>
              <TextField
                name="location"
                required
                id="location"
                label="Input search Location"
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item alignItems="stretch" style={{ display: "flex" }}>
              <Button
                onClick={fetchSearchLocation}
                color="secondary"
                variant="contained"
              >
                Search location
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.geonameId}
              rows={searchLocations}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(data) => {
                console.log(data);
                handleCompareLocations(+data[data.length - 1]);
              }}
              sx={{
                "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                  {
                    display: "none",
                  },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Grid container mb="10px">
            <Grid item>
              <TextField
                name="location"
                required
                id="location"
                label="Input Reference search Location"
                autoFocus
                onChange={handleInputChangeReferenceLocation}
              />
            </Grid>

            <Grid item alignItems="stretch" style={{ display: "flex" }}>
              <Button
                onClick={fetchReferenceSearchLocation}
                color="secondary"
                variant="contained"
              >
                Search location
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.geonameId}
              rows={searchReferenceLocation}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              checkboxSelection
              disableRowSelectionOnClick
              disableColumnFilter
              disableColumnSelector
              disableMultipleRowSelection
              sx={{
                "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                  {
                    display: "none",
                  },
              }}
              onRowSelectionModelChange={(data) => {
                handleCompareReferenceLocation(+data[0]);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box mb="50px" mt="30px">
                <Typography fontWeight="bold">Locations Selected: </Typography>
                {compareLocations.map((loc) => (
                  <span>{loc.toponymName} ,</span>
                ))}
              </Box>
              <Box mb="50px">
                <Typography fontWeight="bold">Reference Location: </Typography>
                <>
                  {compareReferenceLocation ? (
                    compareReferenceLocation.toponymName
                  ) : (
                    <></>
                  )}
                </>
              </Box>
              <Button
                onClick={calculateTimeZone}
                color="secondary"
                variant="contained"
              >
                Calculate Timezone Diference
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  getRowId={(row) => row.id}
                  rows={timeCalculationResult}
                  columns={resultColumns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  disableRowSelectionOnClick
                  sx={{
                    "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                      {
                        display: "none",
                      },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimeCalculator;
