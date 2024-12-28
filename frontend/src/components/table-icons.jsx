import React, { forwardRef } from "react";

import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const tableIcons = {
  Add: forwardRef(function AddComponent(props, ref) {
    return <AddBox {...props} ref={ref} />;
  }),
  Check: forwardRef(function CheckComponent(props, ref) {
    return <Check {...props} ref={ref} />;
  }),
  Clear: forwardRef(function ClearComponent(props, ref) {
    return <Clear {...props} ref={ref} />;
  }),
  Delete: forwardRef(function DeleteComponent(props, ref) {
    return <DeleteOutline {...props} ref={ref} />;
  }),
  DetailPanel: forwardRef(function DetailPanelComponent(props, ref) {
    return <ChevronRight {...props} ref={ref} />;
  }),
  Edit: forwardRef(function EditComponent(props, ref) {
    return <Edit {...props} ref={ref} />;
  }),
  Export: forwardRef(function ExportComponent(props, ref) {
    return <SaveAlt {...props} ref={ref} />;
  }),
  Filter: forwardRef(function FilterComponent(props, ref) {
    return <FilterList {...props} ref={ref} />;
  }),
  FirstPage: forwardRef(function FirstPageComponent(props, ref) {
    return <FirstPage {...props} ref={ref} />;
  }),
  LastPage: forwardRef(function LastPageComponent(props, ref) {
    return <LastPage {...props} ref={ref} />;
  }),
  NextPage: forwardRef(function NextPageComponent(props, ref) {
    return <ChevronRight {...props} ref={ref} />;
  }),
  PreviousPage: forwardRef(function PreviousPageComponent(props, ref) {
    return <ChevronLeft {...props} ref={ref} />;
  }),
  ResetSearch: forwardRef(function ResetSearchComponent(props, ref) {
    return <Clear {...props} ref={ref} />;
  }),
  Search: forwardRef(function SearchComponent(props, ref) {
    return <Search {...props} ref={ref} />;
  }),
  SortArrow: forwardRef(function SortArrowComponent(props, ref) {
    return <ArrowDownward {...props} ref={ref} />;
  }),
  ThirdStateCheck: forwardRef(function ThirdStateCheckComponent(props, ref) {
    return <Remove {...props} ref={ref} />;
  }),
  ViewColumn: forwardRef(function ViewColumnComponent(props, ref) {
    return <ViewColumn {...props} ref={ref} />;
  }),
  BlockIcon: forwardRef(function BlockIconComponent(props, ref) {
    return <BlockIcon {...props} ref={ref} />;
  }),
  CheckCircleIcon: forwardRef(function CheckCircleIconComponent(props, ref) {
    return <CheckCircleIcon {...props} ref={ref} />;
  }),
};

export default tableIcons;
