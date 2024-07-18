<?php

namespace Yatzy;
class Dice
{
    private $value;

    public function roll()
    {
        $this->value = rand(1, 6);
    }

    public function getValue()
    {
        return $this->value;
    }
}
