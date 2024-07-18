<?php

namespace Yatzy;
class YatzyGame
{
    public $dice;
    public $currentRoll;
    public $diceValues;
    public $diceKeep;

    public function __construct()
    {
        $this->dice = [];
        for ($i = 0; $i < 5; $i++) {
            $this->dice[$i] = new Dice();
        }
        $this->currentRoll = 0;
        $this->diceValues = [0, 0, 0, 0, 0];
        $this->diceKeep = [false, false, false, false, false];
    }

    public function rollDice()
    {
        for ($i = 0; $i < 5; $i++) {
            if (!$this->diceKeep[$i]) {
                $this->dice[$i]->roll();
                $this->diceValues[$i] = $this->dice[$i]->getValue();
            }
        }
        $this->currentRoll++;
    }

    public function toggleKeep($index)
    {
        $this->diceKeep[$index] = !$this->diceKeep[$index];
    }
}
