package com.web.app_dev.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import com.web.app_dev.model.Cake;
import com.web.app_dev.model.Dance;
import com.web.app_dev.model.Dj;
import com.web.app_dev.model.EcoItem;
import com.web.app_dev.model.Game;
import com.web.app_dev.model.Music;
import com.web.app_dev.model.New;
import com.web.app_dev.repository.CakeRepo;
import com.web.app_dev.repository.DanceRepo;
import com.web.app_dev.repository.DjRepo;
import com.web.app_dev.repository.EcoRepo;
import com.web.app_dev.repository.GameRepo;
import com.web.app_dev.repository.MusicRepo;
import com.web.app_dev.repository.Newrepo;



@Service
public class ProductService {
    
    @Autowired
    private Newrepo newrepo;

    @Autowired
    public CakeRepo cakeRepo;

    @Autowired
    public EcoRepo ecoRepo;

    @Autowired
    private MusicRepo musicRepo;

    @Autowired
    private DanceRepo danceRepo;

    @Autowired
    private DjRepo djRepo;

    @Autowired
    private GameRepo gameRepo;

    public New savaNew(New new1)
    {
        return newrepo.save(new1);
    }

    public Cake saveCake(Cake cake)
    {
        return cakeRepo.save(cake);
    }

    public EcoItem savEcoItem(EcoItem ecoItem)
    {
        return ecoRepo.save(ecoItem);
    }

    public Music savMusic(Music music)
    {
        return musicRepo.save(music);
    }

    public Dance savDance(Dance dance)
    {
        return danceRepo.save(dance);
    }

    public Game savGame(Game game)
    {
        return gameRepo.save(game);
    }

    public Dj savDj(Dj dj)
    {
        return djRepo.save(dj);
    }

    public List<New> getNew()
    {
        return newrepo.findAll();
    }

    public List<Cake> getCake()
    {
        return cakeRepo.findAll();
    }

    public List<EcoItem> gEcoItems()
    {
        return ecoRepo.findAll();
    }

    public List<Music> gMusics()
    {
        return musicRepo.findAll();
    }

    public List<Dance> gDances()
    {
        return danceRepo.findAll();
    }

    public List<Dj> gDj()
    {
        return djRepo.findAll();
    }

    public List<Game> gGames()
    {
        return gameRepo.findAll();
    }
}
