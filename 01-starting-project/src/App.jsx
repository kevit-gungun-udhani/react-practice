import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from './components/NewProject'
import NoProjectSelected from './components/NoProjectSelected'
import SelectedProject from './components/SelectedProject'
import { useState } from "react";
function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    project: [],
    tasks: []
  })

  function handleAddTask(text){
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        id: taskId,
        projectId: prevState.selectedProjectId,
        text: text
      }

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  function handleSelectedProject(id){
    setProjectState(
      (prevState) => {
        return {
          ...prevState,
          selectedProjectId: id
        }
      }
    )
  }
 

  function handleAddProject(){
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleAddedProject(projectData){
    const newProject = {
      ...projectData,
      id: Math.random()
    }


    setProjectState((prevState) =>{
      return {
         ...prevState,
        selectedProjectId: undefined,
        project: [...prevState.project, newProject]
      }
    })
  }

  function handleCancel(){
    setProjectState(
      (prevState) => {
        return {
          ...prevState,
          selectedProjectId: undefined
        }
      }
    )
  }

  function handleDeleteProject(){
    setProjectState(
      (prevState) => {
        return {
          ...prevState,
          selectedProjectId: undefined,
          project: prevState.project.filter( (project) => project.id !== projectState.selectedProjectId )
        }
      }
    )
  }
  
  const selectedProject = projectState.project.find(project => project.id === projectState.selectedProjectId)
  
  let content = <SelectedProject tasks={projectState.tasks}  project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask}/>;

  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddedProject} onCancel = {handleCancel}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onAddProject={handleAddProject}/> 
  }

  return (  
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onAddProject={handleAddProject} projects={projectState.project} onSelectProject={handleSelectedProject}/>
      {content}
    </main>
  );
}

export default App;
