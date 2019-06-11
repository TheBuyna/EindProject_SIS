<?php


namespace App\Controller;


use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class WeatherController
{

    /**
     * @param $query
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     * @Route("api/getWeather/{query}")
     *
     * Method to get weather by query
     */
    public function getWeatherByQuery($query)
    {
        // Initialize httpClient class;
        $httpClient = HttpClient::create();
        // Url to the mapbox, geocode api request
        $URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'.$query.'.json?access_token=pk.eyJ1IjoidGhlYnV5bmEiLCJhIjoiY2pzdWZuYmxiMXhhajRhb2VndTBkejd1YiJ9.-w5sSkmdFb6Fy796In5Afg';
        $response = $httpClient->request('GET', $URL);
        $content = $response->toArray();
        // Get the latitude and longtitude from the response
        $latitude = $content['features']['0']['center']['1'];
        $longitude = $content['features']['0']['center']['0'];
//        $location =$content['features']['0']['place_name'];
//        $coordinates["latitude"] = $latitude;
//        $coordinates["longitude"] = $longitude;
//        $coordinates["location"] = $location;
//        dd($coordinates);
//        $this->getWeather($latitude, $longitude);
        return new JsonResponse([
            "weather" => $this->getWeather($latitude, $longitude),
            "geocode" => $content
        ], 200);
    }

    public function getWeather($latitude, $longitude)
    {
        $URL = 'https://api.darksky.net/forecast/93efca3b6502e663700ecb988a4be0b0/'.$latitude.','.$longitude.'?units=ca';
        $httpClient = HttpClient::create();
        $response = $httpClient->request('GET', $URL);
        $content = $response->toArray();
//        $weather["current"]
//        dd($content);
        return $content;
    }

}