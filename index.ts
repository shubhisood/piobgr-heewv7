import { enableRipple } from "@syncfusion/ej2-base";
enableRipple(true);

import {
  TreeGrid,
  Page,
  Toolbar,
  Filter,
  Edit
} from "@syncfusion/ej2-treegrid";
import { sampleData } from "./data-source";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";

TreeGrid.Inject(Page, Filter, Toolbar, Edit);

let treegridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  allowFiltering: true,
  editSettings: {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: "Cell",
    newRowPosition: "Below"
  },
  toolbar: [
    "Add",
    "Delete",
    "Update",
    "Cancel",
    "ExpandAll",
    "CollapseAll",
    { text: "Quick Filter", tooltipText: "Quick Filter", id: "toolbarfilter" }
  ],
  toolbarClick: (args: ClickEventArgs) => {
    if (args.item.id === "toolbarfilter") {
      treegridObj.filterByColumn("taskName", "startswith", "Testing");
    }
  },
  childMapping: "subtasks",
  allowPaging: true,
  treeColumnIndex: 1,
  created: function() {
    let items = treegridObj.toolbarModule.getToolbar().children[0]; // get the toolbar items.
    for (let i = 1; i < items.childNodes.length; i++) {
      items.insertBefore(items.childNodes[i], items.firstChild); // re-arrange the toolbar items position
    }
  },
  columns: [
    {
      field: "taskID",
      headerText: "Task ID",
      isPrimaryKey: true,
      textAlign: "Right",
      width: 90
    },
    { field: "taskName", headerText: "Task Name", width: 130 },
    {
      field: "startDate",
      headerText: "Start Date",
      width: 90,
      textAlign: "Right",
      format: "yMd"
    }
  ]
});
treegridObj.appendTo("#TreeGrid");
