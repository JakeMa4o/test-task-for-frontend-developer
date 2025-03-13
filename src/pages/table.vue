<template>
  <div class="ag-theme-alpine" style="height: 500px; width: 100%">
    <AgGridVue 
      :columnDefs="columnDefs" 
      :rowData="rowData" 
      :domLayout="'autoHeight'"
      @grid-ready="onGridReady"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';

// Генерация случайных данных
function generateData(n) {
  const values = ['str1', 'str2', 'str3', 'str4', 'str5'];
  const data = [];
  
  for (let i = 0; i < n; i++) {
    data.push({
      val1: Math.random().toString(36).substring(2, 12), 
      val2: (Math.random() * 100).toFixed(2),
      val3: (Math.random() * 1000).toFixed(4),
      val4: Math.floor(Math.random() * 100),
      val5: Math.floor(Math.random() * 100),
      val6: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`, 
      val7: Math.random().toString(36).substring(2, 12),
      val8: values[Math.floor(Math.random() * values.length)]
    });
  }
  
  return data;
}


const rowData = ref(generateData(100));

const columnDefs = ref([
  { headerName: "Val 1", field: "val1" },
  { headerName: "Val 2", field: "val2" },
  { headerName: "Val 3", field: "val3" },
  { headerName: "Val 4", field: "val4" },
  { headerName: "Val 5", field: "val5" },
  { headerName: "Val 6", field: "val6", filter: true },
  { headerName: "Val 7", field: "val7" },
  { headerName: "Val 8", field: "val8" }
]);


const onGridReady = (params) => {
  params.api.sizeColumnsToFit();
  updateFooterData(params.api);
};

const updateFooterData = (api) => {
  let sumVal3 = 0;
  let sumVal4 = 0;
  const rowCount = api.getDisplayedRowCount();

  api.forEachNode((node) => {
    sumVal3 += parseFloat(node.data.val3);
    sumVal4 += parseFloat(node.data.val4);
  });


  const footerRow = {
    val1: 'Total',
    val2: '',
    val3: sumVal3.toFixed(4), 
    val4: (sumVal4 / rowCount).toFixed(2),
    val5: '',
    val6: '',
    val7: '',
    val8: ''
  };


  rowData.value.push(footerRow);
};
</script>
