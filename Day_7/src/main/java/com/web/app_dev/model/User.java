package com.web.app_dev.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String email;
    private String password;
    private String confirmpassword;
    
    @OneToMany(cascade = CascadeType.REMOVE,mappedBy = "user")
    @JsonManagedReference
    private List<Event> event;

    @OneToMany(cascade = CascadeType.REMOVE,mappedBy = "user1")
    @JsonManagedReference
    private List<CakeSec> cakeSec;

    @OneToMany(cascade = CascadeType.REMOVE,mappedBy = "user2")
    @JsonManagedReference
    private List<Decorables> decorables;

    @OneToMany(cascade =  CascadeType.REMOVE,mappedBy = "user3")
    @JsonManagedReference
    private List<EcoPlan> ecoPlan;

    @OneToMany(mappedBy = "user4",cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    @JsonManagedReference
    private List<Request> request;

    @OneToMany(mappedBy = "user4",cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    @JsonManagedReference
    private List<ARequest> arequest;

    @OneToMany(mappedBy = "user4")
    @JsonManagedReference
    private List<RRequest> rrequest;
}
