import React, { useState, useEffect, Component } from "react";
import { StatusBar } from 'react-native'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {Keyboard, Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList} from "react-native";
import axios from "axios";

export default function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [currentPriority, setCurrentPriority] = useState("")
  const [feed, setFeed] = useState("")
  
  const colors = {
    "baixo": "#FFF500",
    "medio": "#FA8E00",
    "alto": "#FA0100",
  }

  const values = ["baixo","medio","alto"]

  class TodoList extends Component {

    constructor(props){
      super(props);
  
      this.state = ({
        items: [],
        loading: true
      });
  
    }

  async componentDidMount () {
    var newThis = this;
    
      console.log('Iniciando componente DidMount ')
    await  axios.get('https://todolistserver-291112.appspot.com/listItems')
      .then(res => {
        newThis.setState({
          items: res.data.items,
          loading: true
        });
        console.log(JSON.stringify(res.data.items));
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
    
  }}
  

  async function addTask() {
    const search = task.filter(task => task.name === newTask);

    if (search.length !== 0) {
      Alert.alert("Atenção", "Nome da tarefa repetido!");
      return;
    }

    let newNewTask = {
      name: newTask,
      priority: currentPriority
      
    }
    
    setTask([...task, newNewTask]);
    setNewTask("");

    Keyboard.dismiss();
  }
  
  function handlePriorityBtPress(priority){
    setCurrentPriority(priority)

    if(newTask.length === 0){
      const search = task.filter(task => task.priority === priority);
      setFeed(search)
    }else{
      return
    }
    
  }

  async function removeTask(item) {
    Alert.alert(
      "Deletar tarefa",
      "Deseja remover esta tarefa?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => setTask(task.filter(tasks => tasks !== item)),
        }
      ],
      { cancelable: false }
    );
  }
 
  useEffect(() => {
    setFeed([...task])
  }, [task]);

  

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fdfdfd" />
          <View style={styles.header}>
            <Text style={styles.primeiroTitle}>Sua</Text>
            <Text style={styles.segundoTitle}>Lista</Text>
          </View>
          <View style={styles.Body}>
            <FlatList
              data={feed}
              keyExtractor={feed => feed.name}
              showsVerticalScrollIndicator={false}
              style={styles.FlatList}
              renderItem={({ item }) => (
                <View style={styles.ContainerView}>
                  <Text style={styles.Texto}>{item.name}</Text>
                  <TouchableOpacity onPress={() => removeTask(item)}>
                    <MaterialIcons
                      name="cancel"
                      size={27}
                      color= {colors[values[item.priority]]}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          <View style={styles.containerPriority}>
            <View style={styles.borderButtonPriority}></View>

            <TouchableOpacity style={[styles.buttonPriority, { backgroundColor: "#fff" }]} onPress={() => handlePriorityBtPress(0)}>
              <Text style={{ color: "#FFF500", fontWeight: "bold" }}>Baixo</Text>
            </TouchableOpacity>

            <View style={styles.borderButtonPriority}></View>

            <TouchableOpacity style={[styles.buttonPriority, { backgroundColor: "#fff" }]} onPress={() => handlePriorityBtPress(1)}>
              <Text style={{ color: "#FA8E00", fontWeight: "bold" }}>Medio</Text>
            </TouchableOpacity>

            <View style={styles.borderButtonPriority}></View>
            <TouchableOpacity style={[styles.buttonPriority, { backgroundColor: "#fff" }]} onPress={() => handlePriorityBtPress(2)}>
              <Text style={{ color: "#FA0100", fontWeight: "bold" }}>Alto</Text>
            </TouchableOpacity>

            <View style={styles.borderButtonPriority}></View>
          </View>
          

          <View style={styles.Form}>
            <TextInput
              style={styles.Input}
              placeholderTextColor="#aaa"
              autoCorrect={true}
              value={newTask}
              placeholder="Tarefa"
              maxLength={25}
              onChangeText={text => setNewTask(text)}
            />
            <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
              <Ionicons name="ios-add-circle" size={43} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
              }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: "#FFF",

  },
  Body: {
    flex: 1
  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee"
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 5,
    borderColor: "#eee"
  },
  buttonPriority: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: '30%',
    borderRadius: 5,
  },
  borderButtonPriority: {
    borderWidth: 1,
    height: "90%",
    borderColor: "#c9d7e1",
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 30,
    marginLeft: 10
  },
  FlatList: {
    flex: 1,
    marginTop: 5
  },
  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center"
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee"
  },
  primeiroTitle: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    fontWeight: "bold",
    color: '#5d62fa',
    alignItems: 'center'
  },
  segundoTitle: {
    fontFamily: 'sans-serif-light',
    fontSize: 32,
    color: '#5d62fa',
    marginLeft: 6,
    alignItems: 'center'
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: '100%',
    paddingBottom: 5,
    marginBottom: 2,
    marginTop: 5,
    backgroundColor: "#C0D1F0",
  },
  borderBottomHeader: {
    width: '99%',
    height: 4,
    backgroundColor: "#A9DEF0",
    marginBottom: 5,
  },
  containerPriority: {
    width: "90%",
    padding: 5,
    borderRadius: 8,
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 0.2,
    borderColor: "#5d62fa",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 12,
    marginLeft:12,
    backgroundColor: "#eee"

  },
});

