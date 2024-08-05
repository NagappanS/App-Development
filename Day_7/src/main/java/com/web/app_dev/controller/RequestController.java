package com.web.app_dev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.web.app_dev.model.ARequest;
import com.web.app_dev.model.RRequest;
import com.web.app_dev.model.Request;
import com.web.app_dev.model.User;
import com.web.app_dev.service.RequestService;

@RestController
@CrossOrigin
public class RequestController {
    @Autowired
    public RequestService requestService;

    @GetMapping("/pendingRequests")
    public List<Request> getPendingRequests() {
        return requestService.getPendingRequests();
    }
    @GetMapping("/acceptedRequests")
    public List<ARequest> getAcceptRequests() {
        return requestService.getAcceptRequests();
    }
    @GetMapping("/rejectedRequests")
    public List<RRequest> getrejectRequests() {
        return requestService.getRejectRequests();
    }

    @PostMapping("/pendingRequests")
    public void pendingRequests(@RequestBody Request request) {
        requestService.pendingRequests(request);
    }
    

    @PostMapping("/acceptedRequests")
    public void acceptRequest(@RequestBody ARequest arequest) {
        requestService.acceptRequest(arequest);
    }

    @PostMapping("/rejectedRequests")
    public void rejectRequest(@RequestBody RRequest rrequest) {
        requestService.rejectRequest(rrequest);
    }

    @DeleteMapping("/pendingRequests/{id}")
    public void deletePendingRequest(@PathVariable int id) {
        requestService.deletePendingRequest(id);
    }

    @GetMapping("/userss")
    public List<User> getUsers() {
        return requestService.getUsers();
    }
}
