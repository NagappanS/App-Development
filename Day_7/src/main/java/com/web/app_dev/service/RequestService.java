package com.web.app_dev.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.app_dev.model.ARequest;
import com.web.app_dev.model.RRequest;
import com.web.app_dev.model.Request;
import com.web.app_dev.model.User;
import com.web.app_dev.repository.AcceptReqRepo;
import com.web.app_dev.repository.RejectReqRepo;
import com.web.app_dev.repository.RequestRepo;
import com.web.app_dev.repository.UserRepo;

@Service
public class RequestService {
    
    @Autowired
    public RequestRepo requestRepo;

    @Autowired
    public AcceptReqRepo acceptReqRepo;

    @Autowired 
    public RejectReqRepo rejectReqRepo;

    @Autowired 
    public UserRepo userRepo;

    public List<Request> getPendingRequests() {
        return requestRepo.findAll();
    }
    
    public List<ARequest> getAcceptRequests() {
        return acceptReqRepo.findAll();
    }

    public List<RRequest> getRejectRequests() {
        return rejectReqRepo.findAll();
    }


    public void pendingRequests(Request request)
    {
        requestRepo.save(request);
    }

    public void acceptRequest(ARequest aRequest) {
        acceptReqRepo.save(aRequest);
        requestRepo.deleteById(aRequest.getId());
    }

    public void rejectRequest(RRequest rrequest) {
        rejectReqRepo.save(rrequest);
        requestRepo.deleteById(rrequest.getId());
    }

    public void deletePendingRequest(int id) {
        requestRepo.deleteById(id);
    }

    public List<User> getUsers() {
        return userRepo.findAll();
    }
}
