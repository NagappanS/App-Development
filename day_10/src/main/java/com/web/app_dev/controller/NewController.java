package com.web.app_dev.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.app_dev.model.Cake;
import com.web.app_dev.model.Dance;
import com.web.app_dev.model.Dj;
import com.web.app_dev.model.EcoItem;
import com.web.app_dev.model.Game;
import com.web.app_dev.model.Music;
import com.web.app_dev.model.New;
import com.web.app_dev.service.ProductService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@CrossOrigin
@RequestMapping("/new")
public class NewController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public New postMethodName(@RequestBody New newdata) {

       return productService.savaNew(newdata);
    }

    @PostMapping("/cake")
    public Cake cake(@RequestBody Cake cakes) {

       return productService.saveCake(cakes);
    }
    
    @PostMapping("/ecoitem")
    public EcoItem posteco(@RequestBody EcoItem ecoItem) {
          
        return productService.savEcoItem(ecoItem);
    }
    
    @PostMapping("/music")
    public Music postMusic(@RequestBody Music music) {
          
        return productService.savMusic(music);
    }

    @PostMapping("/dance")
    public Dance postDance(@RequestBody Dance dance) {
          
        return productService.savDance(dance);
    }

    @PostMapping("/dj")
    public Dj postDj(@RequestBody Dj dj) {
          
        return productService.savDj(dj);
    }

    @PostMapping("/game")
    public Game postGame(@RequestBody Game game) {
          
        return productService.savGame(game);
    }


    
    @GetMapping("/add")
    public List<New> getNew() {
        return productService.getNew();
    }

    @GetMapping("/cakes")
    public List<Cake> getCakes() {
        return productService.getCake();
    }

    @GetMapping("/ecoitem")
    public List<EcoItem> get() {
        return productService.gEcoItems();
    }
    
    @GetMapping("/music")
    public List<Music> getMusic() {
        return productService.gMusics();
    }

    @GetMapping("/dance")
    public List<Dance> getDances() {
        return productService.gDances();
    }

    @GetMapping("/dj")
    public List<Dj> getDj() {
        return productService.gDj();
    }

    @GetMapping("/game")
    public List<Game> getGames() {
        return productService.gGames();
    }
    
}
