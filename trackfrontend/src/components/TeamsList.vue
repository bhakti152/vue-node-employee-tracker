<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by team"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Teams List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(team, index) in teams"
          :key="index"
          @click="setActiveTeam(team, index)"
        >
          {{ team.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTeams">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTeam">
        <h4>Team</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTeam.name }}
        </div>
        <div>
          <label><strong>Start Date:</strong></label> {{ currentTeam.startDate }}
        </div>
        <div>
          <label><strong>End Date:</strong></label> {{ currentTeam.endDate}}
        </div>
        <br/>
         <router-link :to="'/teams/' + currentTeam._id" >Edit Team</router-link> &nbsp;&nbsp;&nbsp;&nbsp;
        <router-link :to="'/employeeAdd/' + currentTeam._id" >Add Employee</router-link>

<br/>
<br/>
      <h5>Employees  </h5>(select employee to see it's task)
        <ul class="list-group">
        <li class="list-group-item"
         
        :class="{ active: index == empindex }"
          v-for="(emp, index) in emps"
          :key="index"
          @click="setActiveEmp(emp, index)"
        >
           <div>
          <label><strong>Name:</strong></label> {{ emp.name }}
        </div>
        <div>
          <label><strong>Join Date:</strong></label> {{emp.joinDate}}
        </div>
        
        </li>
      </ul>
       
        <div v-if="currentEmp">
        <h4>Tasks</h4>
<ul class="list-group">
        <li class="list-group-item"
         
          v-for="(task, index) in tasks"
          :key="index"
        >
           <div>
          <label><strong>Code:</strong></label> {{ task.code }}
        </div>
          <div>
          <label><strong>Name:</strong></label> {{ task.name }}
        </div>
        <div>
          <label><strong>Project:</strong></label> {{task.project}}
        </div>
          <div>
          <label><strong>Description:</strong></label> {{ task.description }}
        </div>
        <div>
          <label><strong>Logs:</strong></label> 
          <br/>
          <label>Logged Start Date:</label>{{task.logs[0].loggedStartDate}}
        </div>
        
        </li>
      </ul>
   
<br/>
<br/>
        
       
      </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Team...</p>
      </div>
    </div>
  </div>
</template>

<script>
import TeamDataService from "../services/TeamDataService";

export default {
  name: "teams-list",
  data() {
    return {
      teams: [],emps:[],tasks:[],
      currentTeam: null,currentEmp:null,
      currentIndex: -1,
      empindex:-1,
      name: ""
    };
  },
  methods: {
    retrieveTeams() {
      TeamDataService.getAll()
        .then(response => {
          this.teams = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTeams();
      this.currentTeam = null;
      this.currentIndex = -1;
      this.currentEmp=null;
      this.empindex=-1;
    },

   async setActiveTeam(team, index) {
      this.currentTeam =await team;
      this.currentIndex =await index;
     await    TeamDataService.getEmp(this.currentTeam._id)
        .then(response => {
          this.emps = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
      async setActiveEmp(team, index) {
      this.currentEmp =await team;
      this.empindex =await index;
     await    TeamDataService.getTask(this.currentEmp._id)
        .then(response => {
          this.tasks = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    removeAllTeams() {
      TeamDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TeamDataService.findByTitle(this.name)
        .then(response => {
          this.teams = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTeams();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
