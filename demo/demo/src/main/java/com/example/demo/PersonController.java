package com.example.demo;

import com.fasterxml.jackson.core.JsonEncoding;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.Arrays;
import java.util.List;


@RestController
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    @Autowired
    public PersonController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @GetMapping("/test")
    public String responseText(){

        return "Radi";
    }

    @GetMapping("/createPersons")
    public String createPerson(){
        personRepository.saveAll(Arrays.asList(new Person("Test","Prezime"),new Person("Test 2","Prezime2")));
        return "Persons are created";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/responsePersons")
    public Iterable<Person> responsePerson(){
        Iterable<Person> list = personRepository.findAll();
        return list;
    }

    @GetMapping("/findPersonbyid")
    public Person retreivePerson(@RequestParam Long id){
        System.out.println(id);
        Person person = personRepository.findById(id).get();
        return person;
    }

    @DeleteMapping("/deletePersonById")
    public String retreiveStatus(@RequestParam Long id){
        try{
            personRepository.deleteById(id);
            return "User id: " + id + " was deleted!";
        }catch (EmptyResultDataAccessException ex){

        }
return null;
    }

    @Transactional
    @DeleteMapping("/deletePersonsByName")
    public String retreiveStatusFirst(@RequestParam(value="firstName") String firstName ){
        try{
            personRepository.deleteByFirstName(firstName);
            return "User with name: " + firstName + " was deleted!";
        }catch (EmptyResultDataAccessException ex){
            return "There is no user with the name " + firstName;
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/create")
    public Person create(@RequestParam(value="firstName") String firstName, @RequestParam(value="lastName") String lastName) {
        Person person = new Person(firstName,lastName);
        personRepository.save(person);

        return person;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deleteAll")
    public String retreiveStatusDeleted(){
            personRepository.deleteAll();
            return "Persons was deleted!";
    }


}
