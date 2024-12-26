import React, { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
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
